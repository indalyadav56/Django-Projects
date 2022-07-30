#!/usr/bin/env bash
set -Eeuo pipefail

################################################################################
# define variables
################################################################################

POSTGRES_PACKAGE=postgresql-client-13

# add postgres apt repo to get more recent postgres versions

sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt buster-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt-get update -qq
apt-get -qq \
    --yes \
    --allow-downgrades \
    --allow-remove-essential \
    --allow-change-held-packages \
    install $POSTGRES_PACKAGE --fix-missing -f
