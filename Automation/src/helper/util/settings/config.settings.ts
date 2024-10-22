import * as configData from './config.values.json';

const users={
    "validuser":configData.users.ValidUser,
    "notvaliduser":configData.users.NotValidUser,
    "validuserwrongpass":configData.users.ValidUserWrongPassUsername
    
}

const passwords={
    "validuser":configData.passwords.ValidPassword,
    "notvaliduser":configData.passwords.NotValidPassword,
    "validuserwrongpass":configData.passwords.ValidUserWrongPassPassword
}

const appUrls={
    "BlackboardNebrija":configData.urls.BlackBoard,
    "AcademicoNebrija": configData.urls.AcademicoNebrija
}

export const usersMap = new Map(Object.entries(users));
export const passwordsMap = new Map(Object.entries(passwords));
export const urlsMap = new Map(Object.entries(appUrls));