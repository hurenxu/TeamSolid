#!/usr/bin/env bash

echo "Running pre-commit hook"
# ./scripts/run-tests.bash

# $? stores exit value of the last command
#if [ $? -ne 0 ]; then
# echo "Tests must pass before commit!"
# exit 1
#fi

GR='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "start testing eslint"
npm run lint
if [ $? -ne 0 ]
then
    printf "\n\n${RED}Eslint not passed! ${NC}Please fix the error(s) above and commit again!\n"
    exit 1
else
    printf "\n\n${GR}Eslint passed! ${NC}\n"
fi

exit 0
