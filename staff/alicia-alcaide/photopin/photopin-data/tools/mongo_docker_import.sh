#!/bin/bash

docker cp test-users.json mongodb:/tmp/
docker cp test-pins.json mongodb:/tmp/
docker cp test-pmaps.json mongodb:/tmp/

docker exec mongodb bash -c "mongoimport --db photopin --collection users --drop --file /tmp/test-users.json"
docker exec mongodb bash -c "mongoimport --db photopin --collection pins --drop --file /tmp/test-pins.json"
docker exec mongodb bash -c "mongoimport --db photopin --collection pmaps --drop --file /tmp/test-pmaps.json"
