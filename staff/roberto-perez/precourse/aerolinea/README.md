# SkyLab Airlines

## Introducción

**SkyLab Airlines** es una aplicación que muestra una inferfaz de usuario mediante el terminal, que ayuda a los usuarios a realizar una serie de acciones dependiendo el *tipo* de usuario.

## Descripción funcional

La aplicación consiste en mostrar un listado de los vuelos de ese día. Me diante un `prompt` se le pedirá al usuario que se identifique para, posteriormente, informe qué tipo de usuario es: **ADMIN** o **USER**.

Si el usuarios es **USER**:

1. Se le permitirá filtrar vuelos por un coste igual a al introducido:
    - Se le mostrará al usaurio un listado filtrado por costes superior al importe introducido.
    - Se le mostrará al usaurio un listado filtrado por costes inferior al importe introducido.
2. Se le dará la opción la usuario para que pueda comprar un vuelo indicano el ID del mismo.


Si el suaurio es **ADMIN**:

1. Se le permitirá crear, eliminar vuelos o salir de la aplicación.
    - Los vuelos se eliminan indicando el ID del mismo.    

## Descripcción técnica

**SkyLab Airlines** ha sido desarollada completamente en:

![JavaScript](doc/images/javascript.png)
