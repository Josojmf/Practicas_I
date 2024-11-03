import * as configData from './config.values.json';

const users={
    "validuser":configData.users.validuser,
    "notvaliduser":configData.users.notvaliduser,
    "validuserwrongpass":configData.users.validuserwrongpassusername,
    "adminuserpython":configData.users.adminuserpython,
    "validuserpython":configData.users.validuserpython,
    "notvaliduserpython":configData.users.notvaliduser   
}

const passwords={
    "validuser":configData.passwords.validuser,
    "notvaliduser":configData.passwords.notvaliduser,
    "validuserwrongpass":configData.passwords.Validuserwrongpassusername,
    "validuserpython":configData.passwords.validpasswordpython,
    "adminuserpython":configData.passwords.adminuserpython,
    "notvaliduserpython":configData.passwords.notvaliduserpython,
    "validuserwrongpasspython":configData.passwords.validuserwrongpasspython,
}

const appUrls={
    "BlackboardNebrija":configData.urls.BlackBoard,
    "AcademicoNebrija": configData.urls.AcademicoNebrija,
    "PythonWebService":configData.urls.PythonWebService,
}

export const usersMap = new Map(Object.entries(users));
export const passwordsMap = new Map(Object.entries(passwords));
export const urlsMap = new Map(Object.entries(appUrls));