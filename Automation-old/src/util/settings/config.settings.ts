import * as configData from './config.values.json';

const users ={
    "user": configData.users.user1,
}
const passwords ={
    "password": configData.passwords.password1,
}
const appUrls ={
    "blackboardNebrija": configData.appUrls.blackboardNebrija,
}

export const usersMap = new Map(Object.entries(users));
export const passwordsMap = new Map(Object.entries(passwords));
export const appUrlsMap = new Map(Object.entries(appUrls));