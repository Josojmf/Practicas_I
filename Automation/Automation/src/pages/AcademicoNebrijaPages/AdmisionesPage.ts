import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class AdmisionesPage{


    private base:wrapperFunctions;

    constructor(private page: Page){
        this.page = page;
        this.base = new wrapperFunctions(page);
    }

    async waitForNavigation(){
        await this.page.waitForLoadState("networkidle");
    }
    
    async checkReconocimientoCreditosPage(){
       //check h1 of page
       const title = await this.page.locator("//html/body/div[2]/form/div/div/div/div/div[2]/div/div[2]/div/div[1]/span/h1");
            return title.textContent();

    }
}