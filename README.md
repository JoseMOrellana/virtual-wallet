# Virtual Wallet

Proyecto Virtual Wallet, aplicación que simula transacciones a una billetera virtual. Cuenta con autenticación de usuarios y la capacidad de realizar depositos y pagos a la billetera.
Realizado con el stack MERN

## Recursos
* [Video explicativo]([https://github.com/madhums/node-express-mongoose/wiki/Apps-built-using-this-approach](https://www.youtube.com/watch?v=UFF7CFerkPM))
* [Guia de google para crear contraseña de aplicaciones](https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237?hl=es-419) - Esto es necesario para configurar el envio de correos de la aplicación. Si no desea o no puede utilizar sus datos, yo puedo suministrarle mis datos para que pueda probar el envio de correos. Si no desea hacer uso del envio de correos, el server `service-db` imprime en consola el contenido de cualquier correo que no pueda ser enviado.
* En la carpeta base se encuentra el archivo de la colección de postman con la documentación de los endpoints.

## Uso

El código cuenta con 3 carpetas principales, una para cada pieza fundamental de la aplicación: `client`, `service-client` y `service-db`

### Client
El frontend de la aplicación, realizado con React y Vite. Para ejectuarlo, simplemente:

```sh
cd client
npm i
npm run dev
```

### Service-client
Se encarga de recibir las peticiones del `client`, validar la data suminstrada y realizar peticiones a `service-db` para guardar o extraer datos de la BD.

Debe crearse un archivo `.env` para almacenar las variables de entorno, el archivo `.env.template` sirve como referencia de como debe verse este archivo:

```sh
PORT=El puerto que va a utilizar service-client
SECRET=El string que sirve como llave para la encriptación 

CONSUMER_HOST=El host desde donde el client va a realizar las peticiones a service-client, por ejemplo 'localhost'
CONSUMER_PORT=El puerto desde donde el client va a realizar las peticiones a service-client

API_HOST=El host hacia donde service-client va a realizar peticiones  service-db, por ejemplo 'localhost'
API_PORT=El host hacia donde service-client va a realizar peticiones  service-db
```

Una vez creado este archivo `.env` se procede a:
```sh
cd service-client
npm i
npm start
```

### Service-db
El encargado de realizar operaciones a la base de datos según las peticiones que realice `service-client`. Tambien es el encargado de enviar el correo con el token
para la validación de un pago.

Debe crearse un archivo `.env` para almacenar las variables de entorno, el archivo `.env.template` sirve como referencia de como debe verse este archivo:

```sh
PORT=El puerto que va a utilizar service-db
SECRET=El string que sirve como llave para la encriptación 

EMAIL_SERVICE=El proveedor del servicio de correos, en mi caso utilice Gmail
EMAIL_HOST=El Host del proveedor del servicio de correo, en caso de ser Gmail seria 'smtp.gmail.com'
EMAIL_PORT=El puerto que utiliza el proveedor de servicio de correo, Gmail suele utilizar el 465
EMAIL_USER=La cuenta de correo desde donde se van a enviar los correos
EMAIL_PASSWORD=La contraseña de aplicación proporcionada por el proveedor para poder realizar el envio de correo

CONSUMER_HOST=El host desde donde el service-client va a realizar las peticiones a service-db, por ejemplo 'localhost'
CONSUMER_PORT=El puerto desde donde el service-client va a realizar las peticiones a service-db

DB_HOST=El host donde esta almacenada la BD, por ejemplo 'localhost'
DB_PORT=El pueto que utiliza la BD
DB_NAME=El nombre para la BD
```

Una vez creado este archivo `.env` se procede a:
```sh
cd service-db
npm i
npm start
```

### Ojo
Vale la pena aclarar que las variables de entorno deben coincidir entre ellas, es decir: 
```sh
El CONSUMER_PORT del .env en service-db debe coincidir con el valor suministrado en PORT del .env de service-client
El CONSUMER_PORT del .env en service-client debe coincidir con el puerto donde se esta ejecutando client
```
