#!/bin/bash

docker cp testdata.json mongodb:/tmp/

docker exec mongodb bash -c "mongo photopin < /tmp/testdata.json"
