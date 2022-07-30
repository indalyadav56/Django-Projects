#!/usr/bin/env bash
set -Eeuo pipefail

################################################################################
# Create user and folders
################################################################################

useradd -ms /bin/false napims360

mkdir -p /var/run/napims360
mkdir -p /var/run/napims360/cache
mkdir -p /var/run/napims360/log
touch /var/run/napims360/uwsgi.pid

chown napims360: /var/run/napims360/* -Rf
chmod -R 755 /var/run/napims360/* -R


################################################################################
# last steps and cleaning
################################################################################

apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
