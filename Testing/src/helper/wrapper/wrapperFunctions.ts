import { Page } from "@playwright/test";
import {
  testUserMap,
  testPwdsMap,
  urlsMap,
} from "../util/settings/config.settings";

export default class WrapperFunctions {
  constructor(private page: Page) {}
  async goto(url: string) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  }

  async waitAndClick(locator: string) {
    const element = await this.page.locator(locator);
    await element.waitFor({ state: "visible" });
  }
  private static getUserPwd(user: string) {
    let userName = testUserMap.get(user);
    let credentials: any[] = [];
    let userPwd = testPwdsMap.get(user);
    credentials[0] = userName;
    credentials[1] = userPwd;
    return credentials;
  }

  static loginUsers(user: string) {
    let role = user.toLowerCase();
    let credentials: any[];
    credentials = this.getUserPwd(role).slice();
    return credentials;
  }

  static getUrlApp() {
    try {
      let url = urlsMap.get(process.env.npm_config_APPS).toString();
      return url;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}
