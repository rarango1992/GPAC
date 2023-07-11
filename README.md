
# GPAC Test

Desarrollo de una API REST para una aplicación de gestión de tareas que ayude a los usuarios a organizar y administrar sus actividades diarias. La aplicación debe permitir a los usuarios crear, seguir y completar tareas, establecer fechas límite, asignar prioridades y añadir notas según sea necesario. Además, los usuarios pueden categorizar las tareas en proyectos o etiquetas para una mejor organización. La aplicación debe ofrecer funcionalidades de búsqueda y filtrado, permitiendo a los usuarios buscar tareas específicas y aplicar filtros según criterios como fecha, prioridad o proyecto.


## Instalación

Instalar dependencias con NPM

```bash
  cd /BACKEND/API
  npm install
```
    
## Environment Variables

Para correr este proyecto, asegúrate de validar los siguientes valores dentro del archivo .env

`MONGO_URI="mongodb://127.0.0.1/dbBackend"`

`TOKEN_KEY="p8Cfanp^mfrTjKqMA$(I]W>g5}6#>^7y9@i"`


## Implementación

Para correr este proyecto, primero es necesario tener corriendo el servicio de MongoDB, en caso de correrlo de manera local, asegúrate de apuntar al directorio BACKEND/MONGO del proyecto. 

```bash
  mongod.exe --dbpath <ruta_del_proyecto>\BACKEND\MONGO
```
En caso de contar con un servicio de MongoDB en la nube, las colecciones se encuentran dentro del directorio "MONGO INFO TO IMPORT", dentro de este directorio se encuentran los archivos json para importar la información.

Una vez corriendo el servicio de MongoDB. Ejecutamos el proyecto con NPM.

```bash
  npm start
```


## Documentación



[Documentación de la API Rest](http://localhost:3000/doc)

[Diagramas de flujo de métodos de usuario.](http://localhost:3000/assets/Users.pdf)

[Diagramas de flujo de métodos de tareas.](http://localhost:3000/assets/Tasks.pdf)

[Diagramas de flujo de métodos genéricos.](http://localhost:3000/assets/Misc.pdf)

NOTA: Para acceder a la documentación es necesario tener corriendo el proyecto.


## Ejecución de Pruebas

Para correr las pruebas del proyecto, ejectutar el siguiente comando:

```bash
  npm test
```


## Tech Stack

**Cliente:** No desarrollado.

**Server:** NodeJS, Express, MongoDB.