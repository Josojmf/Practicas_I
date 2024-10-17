import { Page } from "@playwright/test";
import {
  usersMap,
  passwordsMap,
  appUrlsMap,
} from "../../util/settings/config.settings";

export default class wrapperFunctions {
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
    let credential: any[] = [];
    let username = usersMap.get(user);
    let userPwd = usersMap.get(user);
    credential[0] = username;
    credential[1] = userPwd;
    return credential;
  }

  static loginUsers(user: string) {
    let role = user.toLowerCase();
    let credentials: any[];
    credentials = this.getUserPwd(role).slice();
    return credentials;
  }

  static getAppUrl(): string {
    return appUrlsMap.get("blackboardNebrija")!.toString();
  }
}
