#!/usr/bin/env bash
set -Eeuo pipefail

################################################################################
# install packages
################################################################################

# install missing packages of slim distribution and required ones
PACKAGE_LIST=/tmp/apt-packages.txt
if [ -f "$PACKAGE_LIST" ]; then
    apt-get update -qq
    apt-get -qq \
        --yes \
        --allow-downgrades \
        --allow-remove-essential \
        --allow-change-held-packages \
        install `cat $PACKAGE_LIST`
fi
