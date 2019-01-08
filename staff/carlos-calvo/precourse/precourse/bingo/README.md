INSTRUCCIONES LINEA DE COMANDOS
===============================

[Link a markdown](https://daringfireball.net/projects/markdown/syntax#link)

# Comandos principales

### Comandos básicos

1. pwd ver carpeta donde estamos trabajando
2. cd change directory
3. . = carpeta actual // .. carpeta superior
4. ls contenido, ls.. contenido carpeta superior


### Permisos sobre ficheros

1. Crear fichero touch
-touch file1

2. chmod número

rwx = 111 (7)
--- = 000  (0)
-w-=010 (2)


### Mover, copiar y borrar ficheros

tree ver arbol de ficheros y carpetas.

λ mv file2 folder2

mover file2 a carpeta folder2

Copia recursiva de carpeta

cp – r folder2 folder3

Copia folder2 y su contenido en folder3


Renombrar fichero :

mv file1 file2 → Cambiar el nombre del fichero (lo movemos)


tree ver arbol de ficheros.



Comando chmod : (0-7=

rwx = 111 (7)
--- = 000  (0)
-w-=010 (2)


echo mostrar algo en consola.

Echo « hola mundo » > file4

Envia el contenido hola mundo al file4, si no existe lo crea.

Eliminar fichero rm file4