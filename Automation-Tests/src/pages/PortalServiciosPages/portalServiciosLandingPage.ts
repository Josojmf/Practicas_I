import { Page } from "@playwright/test";
import WrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class PortalServiciosLandingPage {
    private base:WrapperFunctions;

    constructor(private page: Page) {
        this.page = page;
        this.base = new WrapperFunctions(this.page);
    }

    async waitForNavigation() {
        await this.page.waitForNavigation();
    }
    async ReturnHomePageUrl() {
        const url =await this.page.url();
    }
    
}