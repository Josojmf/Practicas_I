import * as configData from "../settings/config.values.json";

const testUsers = {
  validUser: configData.users.validUser,
  notValidUser: configData.users.notValidUser,
};

const testPwds = {
  validPwd: configData.passwords.validPassword,
  invalidPwd: configData.passwords.notValidPassword,
};
const urls={
    "portalServicios": configData.appsUrls.portalServiciosURL,
    "blackboard": configData.appsUrls.blackboardURL,
}

export const testUserMap = new Map(Object.entries(testUsers));
export const testPwdsMap = new Map(Object.entries(testPwds));
export const urlsMap = new Map(Object.entries(configData.appsUrls));
