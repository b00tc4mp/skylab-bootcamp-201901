#!/bin/bash

docker exec mongodb bash -c "mongoexport --db photopin --collection users --out /tmp/test-users.json"
docker exec mongodb bash -c "mongoexport --db photopin --collection pins --out /tmp/test-pins.json"
docker exec mongodb bash -c "mongoexport --db photopin --collection pmaps --out /tmp/test-pmaps.json"

docker cp mongodb:/tmp/test-users.json .
docker cp mongodb:/tmp/test-pins.json .
docker cp mongodb:/tmp/test-pmaps.json . 
