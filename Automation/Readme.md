# Repositorio Trabajo fin asignatura Practicas I José María Fernández Gómez
## Tutor: Adolfo Abalo Cascallar
## Tema: Atomatización de tests y testing funcional de aplicaciones de Nebrija

### Steps to run:
#### 1.
` npm install `
#### 2.
#### Add user and password to file: " src\helper\util\settings\config.values.json "
#### In format: 
{
    "urls":{
        "BlackBoard":"https://campusvirtual.nebrija.es/",
        "AcademicoNebrija":"https://academico.nebrija.es/ServiciosApp"
    },
    "users":{
        "ValidUser":"validUser"@alumnos.nebrija.es",
        "NotValidUser":"notValidUser@notvalid.nope",
        "ValidUserWrongPassUsername":"validUser"@alumnos.nebrija.es"
    },
    "passwords":{
        "ValidPassword":"VALIDPASS",
        "NotValidPassword":"notValidPassword",
        "ValidUserWrongPassPassword":"notValidPassword"
    }
} 

#### Subsitute "validuser" with your nebrija username and VALIDPASS with your nebrija pass
