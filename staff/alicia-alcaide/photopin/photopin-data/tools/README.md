## Ejecutar scrip de popular datos:

/c/Users/alici/Downloads/mongodb-win32-x86_64-2012plus-4.1.11-165-g1c9d985/bin/mongo photopin < testdata.json

## Recuperar de la bdd

/c/Users/alici/Downloads/mongodb-win32-x86_64-2012plus-4.1.11-165-g1c9d985/bin/mongoexport.exe --db photopin --collection pmaps --out test-pmaps.json

/c/Users/alici/Downloads/mongodb-win32-x86_64-2012plus-4.1.11-165-g1c9d985/bin/mongoexport.exe --db photopin --collection pins --out test-pins.json

Para crear nueva bdd desde fichero

/c/Users/alici/Downloads/mongodb-win32-x86_64-2012plus-4.1.11-165-g1c9d985/bin/mongoimport.exe --db photopin2 --collection pins --drop --file test-pins.json

## Script para importar datos a la base de datos desde ficheros

En un bash shell, ejecutar el script mongo_import.sh:
./mongo_import.sh

## Script para exportar datos de la base de datos a ficheros

En un bash shell, ejecutar el script mongo_import.sh:
./mongo_import.sh
