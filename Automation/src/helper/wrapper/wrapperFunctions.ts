import { Page } from "@playwright/test";

import {
  usersMap,
  passwordsMap,
  urlsMap,
} from "../util/settings/config.settings";

export default class wrapperFunctions {
  constructor(private page: Page) {}

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async waitAndClick(locator: string) {
    const element = await this.page.locator(locator);
    await element.waitFor({ state: "visible" });
  }

  async saveCookies() {
    const cookies = await this.page.context().cookies();
    const fs = require("fs");
    fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));
  }

  static loginUsers(user: string) {
    let role = user.toLowerCase();
    let credentials: any[];
    credentials = this.getUserPwd(role).slice();
   
    return credentials;
  }

  private static getUserPwd(role: string) {
    let userName = usersMap.get(role);
    let credentials: any[] = [];
    let userPwd = passwordsMap.get(role);
    credentials[0] = userName;
    credentials[1] = userPwd;
    return credentials;
  }

  static getUrlApp() {
    try {
      const appConfig = process.env.npm_config_APPS;
      if (appConfig) {
        const url = urlsMap.get(appConfig);
        if (url) {
          return url.toString();
        } else {
          throw new Error("URL not found in urlsMap for the given app config.");
        }
      } else {
        throw new Error("npm_config_APPS is not defined.");
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  }
}
