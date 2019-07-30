#!/bin/bash

MONGO_EXPORT_EXECUTABLE=/c/Users/alici/Downloads/mongodb-win32-x86_64-2012plus-4.1.11-165-g1c9d985/bin/mongoexport.exe
#MONGO_EXPORT_EXECUTABLE="/C/Archivos de programa/MongoDB/Server/4.0/bin/mongoexport.exe"

"${MONGO_EXPORT_EXECUTABLE}" --db photopin --collection users --out test-users.json
"${MONGO_EXPORT_EXECUTABLE}" --db photopin --collection pins --out test-pins.json
"${MONGO_EXPORT_EXECUTABLE}" --db photopin --collection pmaps --out test-pmaps.json