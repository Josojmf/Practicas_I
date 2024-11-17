import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class HomePage{
    private base: wrapperFunctions;

    constructor(private page: Page) {
      this.page = page;
      this.base = new wrapperFunctions(page);
    }
    private elements = {
        homeTitle: "//html/body/div[2]/header/h1",
        expandableMenuButton: "//html/body/button[1]",
        loginButton:"//html/body/div[1]/div/ul/li[2]/a"
      };
    async waitForNavigation(){
      await this.page.waitForLoadState("networkidle");
    }

    async verifyHomePage(){
        const title = await this.page.getByRole('heading', { name: 'Web service for automation' })
        return title;
        }
    async clickExpandableMenu(){
        await this.page.locator(this.elements.expandableMenuButton).click();
    }
    async ClickLoginButton(){
        await this.page.locator(this.elements.loginButton).click();
    }


}