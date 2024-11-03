import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class LoginPage {
  async checkRequiredFields() {
    const loginUsernameField = this.page.locator(
      "input[id='logininput'][name='username']"
    );
    const loginPasswordField = this.page.locator(
      "input[name='password'][id='loginpwd']"
    );
    await expect(loginUsernameField).toHaveAttribute("required");
    await expect(loginPasswordField).toHaveAttribute("required");
    await expect(loginUsernameField).toBeVisible();
    await expect(loginPasswordField).toBeVisible();
  }
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }
  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }

  async getErrorMessage() {
    const errorMessage = await this.page.locator(
      "li[class='flash-message error']"
    );
    return await errorMessage.textContent();
  }

  async setUserNameLogin(username: string) {
    console.log("Setting username: " + username);
    const loginInput = await this.page.locator("input[name='username']");
    await loginInput.fill(username);
  }

  async setUserPasswordLogin(password: string) {
    await this.page.locator("#loginpwd").fill(password);
  }
  async clickLoginButton() {
    await this.page.locator("#loginbutton").click();
  }

  async loginAs(username: string) {
    let user: any[] = wrapperFunctions.loginUsers(username).slice();
    await this.setUserNameLogin(user[0]);
    await this.setUserPasswordLogin(user[1]);
    await this.clickLoginButton();
  }
}
