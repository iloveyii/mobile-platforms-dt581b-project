#!/bin/bash

DEPLOY_DIR=/home/ubuntu/projects/dev/mobile-platforms-dt581b-project/deploy
command 2> $DEPLOY/error.log

cd $DEPLOY_DIR
git stash
git pull

timestamp=$(date +'%Y-%m-%d %X')

echo  '' >> $DEPLOY_DIR/process.log
echo 'PROJECT (script):'$timestamp >> $DEPLOY_DIR/process.log

exit $?