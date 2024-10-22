import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class AcademicohomePage{


    private base:wrapperFunctions;

    constructor(private page: Page){
        this.page = page;
        this.base = new wrapperFunctions(page);
    }

    async waitForNavigation(){
        await this.page.waitForLoadState("networkidle");
    }

    async checkAcademicoNebrijaPage(){
        const title = await this.page.title();
        return title;
    }

    async CheckUserDetails() {
        const userDetailsComponent= await this.page.locator('//html/body/div[2]/form/div/div/div/div/div[2]/div/div[2]/div/div[1]/div[4]/div[3]/div[1]/div/div/table/tbody/tr/td[2]/div/span/h2');
        await expect(userDetailsComponent).not.toBeNull();
        return userDetailsComponent.textContent();
     
    }

    async CheckNavMenuItems(){
        const menuItems = await this.page.locator('//*[@id="pt1:r1:0:rd2:0:r1:0:nombreServicio2Id_afrDropDownContent::db"]/table').locator('tr');
    }
    async ServiceSearchFor(service: string) {
        const searchInput = await this.page.locator("//html/body/div[2]/form/div/div/div/div/div[2]/div/div[2]/div/div[1]/div[4]/div[4]/div[1]/div/div/div[1]/table/tbody/tr/td[2]/span/input");
        await searchInput.pressSequentially(service)
        await this.page.waitForTimeout(2000);
        const searchButton = await this.page.locator(".af_inputComboboxListOfValues_dropdown-icon-style");
        await searchButton.click();
        await this.page.waitForTimeout(2000);
    }
    async checkServiceSearchResults(service: string) {
        await this.page.waitForTimeout(2000);
        const resultsTable= await this.page.locator(".af_inputComboboxListOfValues_dropdown-popup");
        await expect(resultsTable).not.toBeNull();
        await expect(resultsTable).toContainText(service);
    }

    async clickAdmisionesTab(){
        const admisionesTab = await this.page.getByText("Admisiones").first();
        await admisionesTab.click();
    }

    async clickReconocimientoTab(){
        const reconocimientoTab = await this.page.getByText("Solicitud de Reconocimientos");
        await reconocimientoTab.click();
    }

    async checkAdmisionesDropdown(){
        const dropdown = await this.page.locator('#pt1:men-portlets:sdi::body');
        await expect(dropdown).toBeVisible();
    }
}