import * as configData from './config.values.json';

const users={
    "validuser":configData.users.validuser,
    "notvaliduser":configData.users.notvaliduser,
    "validuserwrongpass":configData.users.validuserwrongpassusername,
    "adminuserpython":configData.users.adminuserpython,
    "validuserpython":configData.users.validuserpython,
    "validuserpython2":configData.users.validuserpython2,
    "notvaliduserpython":configData.users.notvaliduser ,
    "normalUserPython":configData.users.validuserpython, 
}

const passwords={
    "validuser":configData.passwords.validuser,
    "notvaliduser":configData.passwords.notvaliduser,
    "validuserwrongpass":configData.passwords.Validuserwrongpassusername,
    "validuserpython":configData.passwords.validpasswordpython,
    "validuserpython2":configData.passwords.validpasswordpython2,
    "adminuserpython":configData.passwords.adminuserpython,
    "notvaliduserpython":configData.passwords.notvaliduserpython,
    "validuserwrongpasspython":configData.passwords.validuserwrongpasspython,
    "normalUserPython":configData.passwords.validpasswordpython,
}

const appUrls={
    "BlackboardNebrija":configData.urls.BlackBoard,
    "AcademicoNebrija": configData.urls.AcademicoNebrija,
    "PythonWebService":configData.urls.PythonWebService,
}

export const usersMap = new Map(Object.entries(users));
export const passwordsMap = new Map(Object.entries(passwords));
export const urlsMap = new Map(Object.entries(appUrls));