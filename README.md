<h1> Practicas I José María Fernández </h1>

# Repositorio Trabajo final asignatura Practicas I José María Fernández Gómez

## Tutor: Adolfo Abalo Cascallar

## Tema: Automatización de tests y testing funcional de aplicaciones de Nebrija

---

## Tabla de Contenidos

1. [Requisitos previos](#requisitos-previos)
2. [Configuración inicial](#configuración-inicial)
3. [Construcción y ejecución del contenedor Docker](#construcción-y-ejecución-del-contenedor-docker)
4. [Pruebas automatizadas](#pruebas-automatizadas)
5. [Uso de Cloudflared](#uso-de-cloudflared)
6. [Funcionalidades](#funcionalidades)

---

## Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente instalado:

- [Git](https://git-scm.com/)
- [Node.js y npm](https://nodejs.org/)
- [Playwright](https://playwright.dev/)
- [Docker y Docker Compose](https://www.docker.com/)
- [Python 3.9+](https://www.python.org/)

---

## Configuración inicial

### Clonar el repositorio

```
git clone https://github.com/Josojmf/Practicas_I.git
```
```
cd Practicas_I
```

``` 
cd Automation
```

``` 
cd Python-Flask-Web-Service-INT
```
Or
``` 
cd Python-Flask-Web-Service-DEV
```

Configurar archivos necesarios
En la carpeta raíz del proyecto, renombra el archivo .env.sample a .env.

```
mv .env.sample .env
```
Edita el archivo .env con las credenciales necesarias:

env
Copiar código
```
DB_USERNAME=joso
DB_PASSWORD=test123
DB_CLUSTER=mongo
DB_NAME=Practicas_I_Automation_Project
DB_USERS_COLLECTION=Users
DB_LOGS_COLLECTION=Logs
DB_SETTINGS_COLLECTION=Settings
DB_MESSAGES_COLLECTION=Messages
```
Instala las dependencias:
```
cd ..
```
```
cd Automation
```
```
npm install
```
```
npx playwright install
```
```
{
    "urls":{
        "BlackBoard":"https://campusvirtual.nebrija.es/",
        "AcademicoNebrija":"https://academico.nebrija.es/ServiciosApp",
        "PythonWebService":"http://localhost:5005"
    },
    "users":{
        "validuser":"jfernandezg15@alumnos.nebrija.es",
        "notvaliduser":"notValidUser@notvalid.nope",
        "validuserwrongpassusername":"jfernandezg15@alumnos.nebrija.es",
        "adminuserpython":"admin",
        "validuserpython":"testuser",
        "validuserpython2":"testuser2",
        "notvaliduserpython":"notValidUser",
        "validuserwrongpasspython":"testuser",
        "adminPython":"admin",
        "emptyuser":""
    },
    "passwords":{
        "validuser":"",
        "notvaliduser":"notValidPassword",
        "Validuserwrongpassusername":"notValidPassword",
        "adminuserpython":"admin",
        "validpasswordpython":"test",
        "validpasswordpython2":"test",
        "notvaliduserpython":"notValidUser",
        "validuserwrongpasspython":"notValidPassword",
        "EmptyUser":""
    }
}

```
#### Subsitute "validuser" with your nebrija username and VALIDPASS with your nebrija pass

#### Construcción y ejecución del contenedor Docker
Construir la imagen Docker
Desde la carpeta raíz del proyecto:

```
docker build -t josojmf/practicas-i-dev:latest .
```

Ejecutar el contenedor con Docker Compose
```
docker-compose up --build -d
```
Verificar contenedores activos
```
docker ps
```
Deberías ver los contenedores practicas-1-dev y Mongo_DB_DEV_ENV corriendo en los puertos 5000 (web) y 27017 (MongoDB).

Pruebas automatizadas
Ejecución de tests en la aplicación "Academico Nebrija"
Main Page
bash
```
npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrija" --BWSR="chrome"
```
Login con credenciales inválidas
bash
```
npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrijaLoginWithInvalidPassword" --BWSR="chrome"
```
Ejecución de tests en la aplicación Python Web Service
Verificar login con credenciales válidas
bash
```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@loginPythonWebServiceNormalUser" --BWSR="chrome"
```
Verificar registro con credenciales existentes
```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@registerExistingCredentials" --BWSR="chrome"
```
Verificar envío y recepción de mensajes en tiempo real
```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@testchatsendmessageAndOtherUserView" --BWSR="chrome"
```
Uso de Cloudflared
Instala Cloudflared desde Cloudflare.

Ejecuta la aplicación Flask localmente:

bash
```
python main.py
```
Crea un túnel:
bash
```
cloudflared tunnel --url http://127.0.0.1:5000
```
Obtendrás un enlace remoto que te permitirá acceder a tu aplicación desde cualquier lugar.
Funcionalidades
Funciones de usuario
Login
Autenticación de usuarios con credenciales seguras.

Carga de archivos
Permite la carga de archivos PDF.

Visualización de archivos
Permite ver archivos subidos.

Consulta del clima
Consulta el clima actual de una ciudad.

Chat en tiempo real
Comunicación en tiempo real mediante WebSockets.

Opciones de administrador
Gestión de usuarios
Permite agregar, actualizar o eliminar usuarios.

Visualización de registros del sistema
Ayuda a monitorear eventos del sistema.

Configuración del sistema
Administra configuraciones globales de la aplicación.

Ejecución rápida de la aplicación Python sin Docker
Si no deseas usar Docker, puedes ejecutar la aplicación directamente:

Instala las dependencias:
```
pip install -r requirements.txt
```
Inicia el servidor:
```
python main.py
```
La aplicación estará disponible en http://127.0.0.1:5000.

Happy Testing! 🚀
