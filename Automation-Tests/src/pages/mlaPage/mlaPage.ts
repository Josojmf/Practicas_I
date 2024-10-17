import { Page } from "@playwright/test";
import WrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class loginPage {
    private base:WrapperFunctions;
    constructor(private page: Page){
        this.base = new WrapperFunctions(page);
    }
async navigateLoginPage(){
    let appUrl= WrapperFunctions.getUrlApp();
    await this.page.goto(appUrl, {timeout: 60 * 8000, waitUntil: "domcontentloaded"});
}
async setUsernameLogin(username:string){
    await this.page.waitForTimeout(4000);
    await this.page.waitForSelector("#i0116" , {timeout:3000});
    await this.page.fill("#i0116", username);
}
async clickNextButtonLogin(){
    await this.page.waitForSelector("#idSIButton9", {state: "visible"});
    await this.page.locator("#idSIButton9").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.locator("#idBtn_Back").isVisible();
    await this.page.locator("#idBtn_Back").click();
}
async typePwdLogin(pwd:string){
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector("#i0118", {state: "visible"});
    await this.page.waitForTimeout(2000);
    await this.page.fill("#i0118", pwd);
}
async loginAs(username:string){
    let user = WrapperFunctions.loginUsers(username).slice();
    await this.setUsernameLogin(user[0]);
    await this.clickNextButtonLogin();
    await this.typePwdLogin(user[1]);
    await this.clickNextButtonLogin();
}
}