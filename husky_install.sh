#!/usr/bin/env bash

set -e;

result=${PWD##*/}

# prevent from running if script is installed in node modules
if [ $result != "node_modules" ]; then
  echo "installing husky"
  husky install
  exit 0;
fi
