import { expect, type Page } from "@playwright/test";
import wrapperFunctions from "../helper/wrapper/wrapperFunctions";
import { Console } from "console";

export default class loginPage {
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }
  async waitForNavigation(){
    await this.page.waitForLoadState("networkidle");
  }

  async navigateLoginPage() {
    let appUrl = wrapperFunctions.getUrlApp();
    await this.page.goto(appUrl),
      { timeout: 60 * 1000, waitUntil: "domcontentloaded" };
    await this.page.waitForLoadState("networkidle");
  }
  async setUserNameLogin(username: string) {
    await this.page.locator("#i0116").fill(username);
  }
  async clickNextButton() {
    await this.page.waitForSelector("#idSIButton9", { state: "visible" });
    await this.page.waitForLoadState("networkidle");
    await this.page.locator("#idSIButton9").click();
  }

  async typePwdLogin(pwd: string) {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector("#i0118", { state: "visible" });
    await this.page.waitForTimeout(2000);
    await this.page.locator("#i0118").fill(pwd);
  }

  async WaitForUserToInputVerificationCode(){
    await this.page.waitForLoadState("networkidle");
    const verifyByOutlookApp = await this.page.getByRole('button', { name: "Aprobar una solicitud en mi aplicación Outlook Mobile"}).click({timeout: 20000000, force: false});
    await this.page.waitForTimeout(10000); 
  }
  async clickKeepMeSignedIn(){
    await this.page.locator("#idSIButton9").click();
   
  }

  async SaveCookiesState(){
    const cookies = await this.page.context().cookies();
   const saveFile = await this.base.saveCookies();
  }
  async loginAs(username: string) {
    let user: any[] = wrapperFunctions.loginUsers(username).slice();
    await this.setUserNameLogin(user[0]);
    await this.clickNextButton();
    await this.typePwdLogin(user[1]);
    await this.clickNextButton();
    await this.WaitForUserToInputVerificationCode();
  }

  async loginAsEmpty() {
   this.clickNextButton();
  }

  async checkError() {
    await this.page.waitForTimeout(2000);
    const error = await this.page.locator("#usernameError").textContent();
    return error;
  }

  async PasscheckError() {
    await this.page.waitForTimeout(2000);
    const error = await this.page.locator("#passwordError").textContent();
    return error;
  }
}
