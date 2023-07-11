# daneprueba
## Requerimientos

Docker 
Python v3.8.5
Django v4.3.2

## Instalación

 1. Crear carpeta db en el root del proyecto
 2. Ejecutar comando `docker-compose up -d`
 3. Ejecutar comando `python manage.py makemigrations`
 4. Ejecutar comando `python manage.py migrate`
 5. Crear usuario de administración `python manage.py createsuperuser` 
 6. Correr proyecto `python manage.py runserver`

***Nota**:  Previo al diligenciamiento del formularios es necesario crear las preguntas con sus opciones de respuesta en el dashboard de la aplicación.*

## Enlaces
Formulario de Registro
	http://localhost:8000/user/ 
Formulario de Login
	http://localhost:8000/user/login/

Formulario de encuesta: 
	http://localhost:8000/survey/<int:question_id>/d/<int:user_id>/u/
 *Los parametros *@question_id* y *@user_id*  corresponden respectivamente al id de usuario y pregunta*

## Estructura de directorios

#### daneprueba/
 - settings.py: En este archivo es importante conectar las aplicaciones(formulario, usuarios), importar librerias externas y configurar los datos de conexión con la base de datos.
 - urls.py: En este archivo configuramos las urls del proyecto general y sus aplicaciones

### user/
 - models.py: Archivo de cración para el módelo usuario
 - urls.py: Archivo de configuración de las rutas */user/***
 - view.py: Archivo que contiene la lógica de registro y login de la prueba
 - static/: En esta carpeta se encuentran los diferentes archivos css y js de la aplicación, en los archivos javascript se encuentra las validaciones respectivas de los formularios cómo los metodos Fetch de envío de data al servidor.
 - templates/: En esta carpeta se renderizan los templates en este caso los formularios de Login y Registro

### formulario/
 - models.py: Archivo de cración para el módelo formulario con las tablas(Questions, Options y Responses)
 - urls.py: Archivo de configuración de las rutas */formulario/*** 
 - view.py: Archivo que contiene la lógica del formulario
 - admin.py: Para la creación de las preguntas utilizamos el módulo admin y renderizamos los formularios de diligenciamiento desde el dashboard de administración
 - static/: En esta carpeta se encuentran los diferentes archivos css y js de la aplicación, en los archivos javascript se encuentra las validaciones respectivas de los formularios cómo los metodos Fetch de envío de data al servidor.
 - templates/: En esta carpeta se renderizan preguntas y sus formularios respectivamente
