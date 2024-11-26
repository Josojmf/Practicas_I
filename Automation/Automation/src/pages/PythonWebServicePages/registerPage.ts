import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class RegisterPage {
  async checkRequiredFields() {
    const registerUsernameField = this.page.locator(
      "//html/body/div/form/input[1]"
    );
    const loginPasswordField = this.page.locator(
      "//html/body/div/form/input[2]"
    );
    await expect(registerUsernameField).toHaveAttribute("required");
    await expect(loginPasswordField).toHaveAttribute("required");
    await expect(registerUsernameField).toBeVisible();
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

  async checkRegisterButtonDisabled() {
    const loginButton = await this.page.locator("//html/body/div/form/button");
    await loginButton.click();
    await expect(this.page.url()).toContain("register");
  }

  async setUserNameRegister(username: any) {
    console.log("Setting username: " + username);
    const loginInput = await this.page.locator("input[name='username']");
    await loginInput.fill(username);
  }

  async setUserPasswordRegister(password: any) {
    await this.page.locator("#password").fill(password);
  }
  async clickLoginButton() {
    await this.page.locator("//html/body/div/form/button").click();
  }

  async registerAs(username: string, password: string) {
    if (typeof username === "string") {
      await this.setUserNameRegister(username);
      await this.setUserPasswordRegister(password);
      await this.clickLoginButton();
    } else {
      let user: any[] = wrapperFunctions.loginUsers("emptyuser").slice();
      await this.setUserNameRegister(username[0]);
      await this.setUserPasswordRegister(username[1]);
      await this.clickLoginButton();
    }
  }
  async checkRegisterError() {
    const errorMessage = await this.page.locator(
      "li[class='flash-message error']"
    );
    await expect(errorMessage).toBeVisible();
  }
}
