import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class LoginPage {
  async checkRequiredFields() {
    const loginUsernameField = this.page.locator(
      "input[id='logininput'][name='username']"
    );
    const loginPasswordField = this.page.locator(
      "//html/body/div[2]/div/form/input[2]"
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

  async checkLoginButtonDisabled() {
    const loginButton = await this.page.locator("#loginButton");
    await expect(loginButton).toBeDisabled();
  }

  async setUserNameLogin(username: any) {
    console.log("Setting username: " + username);
    const loginInput = await this.page.locator("input[name='username']");
    await loginInput.fill(username);
  }

  async setUserPasswordLogin(password: any) {
    await this.page.locator("#password").fill(password);
  }
  async clickLoginButton() {
    await this.page.locator("#loginButton").click();
  }

  async loginAs(username: any) {
    if(typeof username === 'string'){
    let user: any[] = wrapperFunctions.loginUsers(username).slice();
    await this.setUserNameLogin(user[0]);
    await this.setUserPasswordLogin(user[1]);
    await this.clickLoginButton();
    }else{
      let user: any[] = wrapperFunctions.loginUsers("emptyuser").slice();
      await this.setUserNameLogin(username[0]);
      await this.setUserPasswordLogin(username[1]);
      await this.clickLoginButton();
    }
  }

  async checkRegisterConfirmation() {
    const confirmationMessage = await this.page.locator(
      "li[class='flash-message info']"
    );
    await expect(confirmationMessage).toBeVisible();
  }
}
