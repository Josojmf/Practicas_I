<h1> Practicas I José María Fernández </h1>

# Repositorio Trabajo fin asignatura Practicas I José María Fernández Gómez
## Tutor: Adolfo Abalo Cascallar
## Tema: Atomatización de tests y testing funcional de aplicaciones de Nebrija

### Steps to run:
#### 1.
```
git clone https://github.com/Josojmf/Practicas_I.git 
```
</br>
</br>

```
 cd Practicas_I 
 ```
 </br>
</br>

```
cd Automation 
```
</br>
</br>

```
 npm install 
 ```

````
npx playwright install
````
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

#### 3. Run tests form Academico nebrija App

#### Main Page Academico Nebrija

```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrija" --BWSR="chrome"
```

#### Main Page Login with valid Username and wrong password

```
npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrijaLoginWithInvalidPassword" --BWSR="chrome"
```

####  Main Page Login with invalid Username and wrong password

```
  npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrijaLoginWithInvalidUser" --BWSR="chrome"
```

####  Main Page Login with Empty User

```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrijaLoginWithEmptyUser" --BWSR="chrome"
```


#### Admissions Page

```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@validationOfAdmisionesPage" --BWSR="chrome"
``` 
#### 
