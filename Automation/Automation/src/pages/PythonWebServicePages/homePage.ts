import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class HomePage{
    private base: wrapperFunctions;

    constructor(private page: Page) {
      this.page = page;
      this.base = new wrapperFunctions(page);
    }

    async waitForNavigation(){
      await this.page.waitForLoadState("networkidle");
    }

    async verifyHomePage(){
        const title = await this.page.getByRole('heading', { name: 'Web service for automation' })
        return title;
        }


}