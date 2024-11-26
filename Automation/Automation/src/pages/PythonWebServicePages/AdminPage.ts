import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export class AdminPage {
  async checkAdminPage(link: string) {
    await expect(this.page.url()).toContain(link);
  }
  private base: wrapperFunctions;
  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }

  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }

  async clickManageUsers() {
    const ManageUsersLink = await this.page.locator('a[href="/manage_users"]');
    await ManageUsersLink.click();
  }

  async getLinkText(link: string) {
    switch (link) {
      case "Manage Users":
        const manageUsersLink = await this.page.locator(
          'a[href="/manage_users"]'
        );
        return await manageUsersLink.innerText();
      case "View System Logs":
        const viewSystemLogsLink = await this.page.locator(
          'a[href="/view_logs"]'
        );
      case "Site Settings":
        const siteSettingsLink = await this.page.locator('a[href="/settings"]');
        return await siteSettingsLink.innerText();
    }
  }

  async clickDeleteButtonForThirdUser() {
    const DeleteButton = await this.page.locator('button[id=deleteButton"]');
    await DeleteButton.nth(2).click();
  }
  async getDeletedUser() {
    const deletedUser = await this.page.locator("td").nth(2).innerText();
    return deletedUser;
  }

  async clickPopupAlert() {
    const popupAlertYesButton = await this.page.evaluate(() =>
      alert("Aceptar")
    );
  }
  async checkUserDeleted(deletedUser: string) {
    const locatorDeletedUser = this.page.getByText(deletedUser);
    await expect(locatorDeletedUser).toHaveCount(0);
  }

  async clickLink(link: string) {
    switch (link) {
      case "Manage Users":
        const manageUsersLink = await this.page.locator(
          'a[href="/manage_users"]'
        );
        await manageUsersLink.click();
        break;
      case "View System Logs":
        const viewSystemLogsLink = await this.page.locator(
          'a[href="/view_logs"]'
        );
        await viewSystemLogsLink.click();
        break;
      case "Site Settings":
        const siteSettingsLink = await this.page.locator('a[href="/settings"]');
        await siteSettingsLink.click();
        break;
    }
  }
}
