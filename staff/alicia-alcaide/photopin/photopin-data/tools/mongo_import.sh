#!/bin/bash

MONGO_IMPORT_EXECUTABLE=/c/Users/alici/Downloads/mongodb-win32-x86_64-2012plus-4.1.11-165-g1c9d985/bin/mongoimport.exe
#MONGO_IMPORT_EXECUTABLE="/C/Archivos de programa/MongoDB/Server/4.0/bin/mongoimport.exe"

"${MONGO_IMPORT_EXECUTABLE}" --db photopin --collection users --drop --file test-users.json
"${MONGO_IMPORT_EXECUTABLE}" --db photopin --collection pins --drop --file test-pins.json
"${MONGO_IMPORT_EXECUTABLE}" --db photopin --collection pmaps --drop --file test-pmaps.json
