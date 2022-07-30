#!/usr/bin/env bash
set -Eeo pipefail

function show_help {
    echo """
    Commands
    ---------------------------------------------------------
    bash          : run bash
    eval          : eval shell command
    manage        : invoke django manage.py commands
    start         : start uwsgi server and rq worker+scheduler
    test          : run all tests
    reset_db      : will destroy current db and create it with fixtures
    fixtures      : will truncate related models and populate with fixtures, only run this when db is created for the first time
    """
}

setup_env_for_cron() {
  if grep -Fxq "PGHOST" /root/envs
      then
          echo "env exist, not adding again"
  else
    echo "moving env to /root/envs"
    env >> /root/envs
  fi
}

function prepare_db {
    local MAX_RETRIES=15
    local retries=1
    until pg_isready -q; do
        >&2 echo "Waiting for postgres... $retries host = $PGHOST"

        ((retries++))
        if [[ $retries -gt $MAX_RETRIES ]]; then
            echo "It was not possible to connect to postgres host = $PGHOST"
            exit 1
        fi
        sleep 1
    done
}

function setup_db {
    prepare_db

    if psql -c "" $DB_NAME; then
        echo "$DB_NAME database exists!"
    else
        createdb -e $DB_NAME -e ENCODING=UTF8
        echo "$DB_NAME database created!"
    fi

    # migrate data model if needed
    ./manage.py migrate --noinput
}

function create_fixtures {
    ./manage.py create_fixtures
}

function backup_db {
    prepare_db
    if psql -c "" $DB_NAME; then
        echo "$DB_NAME database exists!"

        mkdir -p $BACKUP_DIR
        local BACKUP_FILE=$BACKUP_DIR/napims360-backup-$(date "+%Y%m%d%H%M%S").sql

        pg_dump $DB_NAME > $BACKUP_FILE
        chown -f napims360: $BACKUP_FILE
        chmod -R 755  $BACKUP_FILE
        echo "$DB_NAME database backup created in [$BACKUP_FILE]."
    fi
}

function restore_db {
    local BACKUP_FILE="$BACKUP_DIR/backend-backup.sql"
    if [ ! -f "$BACKUP_FILE" ]; then
        echo "$BACKUP_FILE does not exist"
        exit 1
    fi

    prepare_db

    # backup current data
    backup_db

    # delete DB is exists
    if psql -c "" $DB_NAME; then
        dropdb -e $DB_NAME
        echo "$DB_NAME database deleted."
    fi

    createdb -e $DB_NAME -e ENCODING=UTF8
    echo "$DB_NAME database created."

    # load dump
    psql -e $DB_NAME < $BACKUP_FILE
    echo "$DB_NAME database dump restored from [$BACKUP_FILE]."

    # prepare DB
    setup_db
}

function collect_static {
    ./manage.py collectstatic --noinput --clear --verbosity 0
}

function setup_django {
    setup_db
    collect_static
}

function test_coverage {
    export TESTING=true

    coverage run manage.py test --parallel --noinput "${@:1}"
    coverage combine --append
    coverage report -m
    coverage erase
}

function reset_db() {
    prepare_db
    if psql -c "" $DB_NAME; then
        dropdb $DB_NAME
        setup_db
        create_fixtures
    fi
}

# --------------------------------------------------------------------------
FILE=/code/.env

if test -f "$FILE"; then
    echo ".env file found"
    source /code/.env
fi
export STATIC_URL=${STATIC_URL:-/static/}
export STATIC_ROOT=${STATIC_ROOT:-/var/www/static/}
export BACKUP_DIR=./napims360/data

export DJANGO_SETTINGS_MODULE=napims360.settings
export DEBUG=false
export TESTING=
# --------------------------------------------------------------------------

# --------------------------------------------------------------------------
# set DJANGO_SECRET_KEY if missing
if [ "$DJANGO_SECRET_KEY" = "" ]; then
    export DJANGO_SECRET_KEY=$(
        cat /dev/urandom | tr -dc 'a-zA-Z0-9-_!@#$%^&*()_+{}|:<>?=' | fold -w 64 | head -n 4
    )
fi
# --------------------------------------------------------------------------


case "$1" in

    bash )
        bash
    ;;

    eval )
        eval "${@:2}"
    ;;

    manage )
        ./manage.py "${@:2}"
    ;;

    backup_db )
        backup_db
    ;;

    restore_dump )
        restore_db
    ;;

    start )
        setup_django
        supervisord -c /etc/supervisor/supervisord.conf
    ;;

    start_dev )
        setup_django
        yarn docker
    ;;

    reset_db )
        reset_db
    ;;

    fixtures )
        create_fixtures
    ;;

    load_env )
        setup_env_for_cron
    ;;

    * )
        show_help
    ;;
esac
