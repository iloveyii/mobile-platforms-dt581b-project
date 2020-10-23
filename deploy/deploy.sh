#!/bin/bash

DEPLOY_DIR=../../../
command 2> $DEPLOY/error.log

cd $DEPLOY_DIR
git pull

timestamp=$(date +'%Y-%m-%d %X')

echo  '' >> $DEPLOY_DIR/process.log
echo 'PROJECT (script):'$timestamp >> $DEPLOY_DIR/process.log

exit $?