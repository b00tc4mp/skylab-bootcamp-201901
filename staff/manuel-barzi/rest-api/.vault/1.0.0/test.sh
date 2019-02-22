#!/bin/bash

if [ $# -eq 0 ]
then
        echo "Running tests!"
        yarn test
elif [ $1 == "debug" ]
then
        echo "Running tests in debug mode!"
        yarn test-debug
fi