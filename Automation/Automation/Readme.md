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
```
cd Automation
```
</br>

```
 npm install
```

```
npx playwright install
```

#### 2.

#### Add user and password to file: " src\helper\util\settings\config.values.json "

#### In format:
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

#### 3. Run tests form Academico nebrija App

#### Main Page Academico Nebrija

```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrija" --BWSR="chrome"
```

#### Main Page Login with valid Username and wrong password

```
npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrijaLoginWithInvalidPassword" --BWSR="chrome"
```

#### Main Page Login with invalid Username and wrong password

```
  npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrijaLoginWithInvalidUser" --BWSR="chrome"
```

#### Main Page Login with Empty User

```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@academicoNebrijaLoginWithEmptyUser" --BWSR="chrome"
```

#### Admissions Page

```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@validationOfAdmisionesPage" --BWSR="chrome"
```

### Python App

#### Main page validation

```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS=" @testhomePageValiation" --BWSR="chrome"

```
#### Main page redirections validation

```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@testhomePageLinksCorrectReddirection" --BWSR="chrome"

```

#### Files page validation

##### Normal file workflow
```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS=" @testuploadFile" --BWSR="chrome"
 
```
##### Big file upload workflow
```
 npm run test --ENV="local" --APPS="AcademicoNebrija" --TAGS="@testUploadBigFile" --BWSR="chrome"
```





#### Login With invalid credentials

```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@loginPythonWebServiceInvalidCredentials" --BWSR="chrome"
```

#### Login With normal credentials

```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@loginPythonWebServiceNormalUser" --BWSR="chrome"
```

#### Login With Empty credentials

```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@loginPythonWebServiceEmptyCredentials" --BWSR="chrome"

```

#### Login With Admin credentials

```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@loginPythonWebServiceAdminUser" --BWSR="chrome"

```

#### Verify send message

```

npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@testchatsendmessage" --BWSR="chrome"

```

#### Verify message by other user

```
 npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@testchatsendmessageAndOtherUserView" --BWSR="chrome"
```
#### Register with valid credentials

```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@registerValidCredentials" --BWSR="chrome"
```
#### Register with existing credentials

```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@registerExistingCredentials" --BWSR="chrome"
```
#### Check weather of existing city
```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@testSearchForcity" --BWSR="chrome"
```
#### Check weather of non existing city
```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@testSearchForcityNotExistent" --BWSR="chrome"
```
#### All features

```
npm run test --ENV="local" --APPS="PythonWebService" --TAGS="@loginPythonWebServiceInvalidCredentials or @loginPythonWebServiceNormalUser or @loginPythonWebServiceEmptyCredentials or @loginPythonWebServiceAdminUser or @allTagsLoginPythonWebService" --BWSR="chrome"
```
