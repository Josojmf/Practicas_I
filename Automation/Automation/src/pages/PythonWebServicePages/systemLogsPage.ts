import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export class SystemLogsPage {
  async checkManageUsersnPage(link: string) {
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
}
