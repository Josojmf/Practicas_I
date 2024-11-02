import * as configData from './config.values.json';

const users={
    "validuser":configData.users.ValidUser,
    "notvaliduser":configData.users.NotValidUser,
    "validuserwrongpass":configData.users.ValidUserWrongPassUsername,
    "adminUserPython":configData.users.AdminUserPython,
    "validuserpython":configData.users.validuserpython,
    "notValidUserPython":configData.users.NotValidUser
    
}

const passwords={
    "validuser":configData.passwords.ValidPassword,
    "notvaliduser":configData.passwords.NotValidPassword,
    "validuserwrongpass":configData.passwords.ValidUserWrongPassPassword,
    "validuserpython":configData.passwords.validPasswordPython,
    "adminUserPython":configData.passwords.AdminUserPython,
    "notValidUserPython":configData.passwords.NotValidUserPython,
    "validUserWrongPassPython":configData.passwords.validUserWrongPassPython,
}

const appUrls={
    "BlackboardNebrija":configData.urls.BlackBoard,
    "AcademicoNebrija": configData.urls.AcademicoNebrija,
    "PythonWebService":configData.urls.PythonWebService,
}

export const usersMap = new Map(Object.entries(users));
export const passwordsMap = new Map(Object.entries(passwords));
export const urlsMap = new Map(Object.entries(appUrls));