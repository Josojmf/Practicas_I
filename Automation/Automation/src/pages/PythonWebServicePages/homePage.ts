import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";

export default class HomePage {
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }
  private elements = {
    homeTitle: "//html/body/div[2]/header/h1",
    expandableMenuButton: "//html/body/button[1]",
    loginButton: "//html/body/div[1]/div/ul/li[2]/a",
    viewFilesMenu: "//html/body/div[2]/div/div/div[1]/a",
    checkWeatherMenu: "//html/body/div[2]/div/div/div[2]/a",
    chatMenu: "//html/body/div[2]/div/div/div[3]/a",
    adminDashboardMenu: "//html/body/div[2]/div/div/div[4]/a",
  };
  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }

  async verifyHomePage() {
    const title = await this.page.getByRole("heading", {
      name: "Web service for automation",
    });
    return title;
  }
  async clickExpandableMenu() {
    await this.page.locator(this.elements.expandableMenuButton).click();
  }
  async ClickLoginButton() {
    await this.page.locator(this.elements.loginButton).click();
  }

  async checkFourMenus() {
    const viewFiles = await this.page
      .locator(this.elements.viewFilesMenu)
      .isVisible();
    const checkWeather = await this.page
      .locator(this.elements.checkWeatherMenu)
      .isVisible();
    const chat = await this.page.locator(this.elements.chatMenu).isVisible();
    const adminDashboard = await this.page
      .locator(this.elements.adminDashboardMenu)
      .isVisible();
    return {
      viewFiles: viewFiles,
      checkWeather: checkWeather,
      chat: chat,
      adminDashboard: adminDashboard,
    };
  }

  async clickViewFilesLink() {
    await this.page.locator(this.elements.viewFilesMenu).click();
  }

  async clickCheckWeatherLink() {
    await this.page.locator(this.elements.checkWeatherMenu).click();
  }
  async clickChatLink() {
    await this.page.locator(this.elements.chatMenu).click();
  }
  async clickAdminDashboardLink() {
    await this.page.locator(this.elements.adminDashboardMenu).click();
  }

}
