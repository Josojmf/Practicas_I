import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export class AdminPage {
    private base: wrapperFunctions;
    constructor(private page: Page) {
        this.page = page;
        this.base = new wrapperFunctions(page);
      }
      
    async waitForNavigation(){
        await this.page.waitForLoadState("networkidle");
      }
  

    async clickManageUsers() {
        const ManageUsersLink= await this.page.locator('a[href="/manage_users"]');
        await ManageUsersLink.click();
    }

    async clickDeleteButtonForThirdUser() {
        const DeleteButton= await this.page.locator('button[id=deleteButton"]');
        await DeleteButton.nth(2).click();
    }
    async getDeletedUser(){
        const deletedUser=await this.page.locator('td').nth(2).innerText();
        return deletedUser;
    }

    async clickPopupAlert(){
        const popupAlertYesButton=await this.page.evaluate(()=>alert('Aceptar'));
    }
    async checkUserDeleted(deletedUser:string){
        const locatorDeletedUser =this.page.getByText(deletedUser)
        await expect(locatorDeletedUser).toHaveCount(0);

    }
}