import wrapperFunctions from "../helper/wrapper/wrapperFunctions";
import { Page } from "@playwright/test";

export default class LoginPage {
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }
  async navigateLoginPage() {
    let appUrl = wrapperFunctions.getAppUrl();

    await this.page.goto(appUrl!, {
      timeout: 60 * 1000,
      waitUntil: "domcontentloaded",
    });
  }
  async setUsernameLogin(username: string) {
    await this.page.waitForTimeout(4000);
    await this.page.waitForSelector("#i0116");
    await this.page.locator("#i0116").fill(username);
  }
  async clickNextButton() {
    await this.page.waitForSelector("#idSIButton9", { state: "visible" });
    await this.page.locator("#idSIButton9").click();
    await this.page.waitForLoadState("networkidle");
    if (await this.page.locator("#idBtn_Back").isVisible()) {
      await this.page.locator("#idBtn_Back").click();
    }
    await this.page.waitForTimeout(2000);
    await this.page.locator("#idSIButton9").click();
  }

  async typePwdLogin(password: string) {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector("#i0118", { state: "visible" });
    await this.page.waitForTimeout(2000);
    await this.page.locator("#i0118").fill(password);
  }

  async loginAs(username: string) {
    let user: any[] = wrapperFunctions.loginUsers(username).slice();
    console.log("Loggin in as: ", user);
    await this.setUsernameLogin(user[0]);
    await this.clickNextButton();
    await this.typePwdLogin(user[1]);
    await this.clickNextButton();
  }
}
