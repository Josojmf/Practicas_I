import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";
import { log } from "console";

export default class WeatherPage {
  async checkWeatherPage(link: string) {
    await expect(this.page.url()).toContain(link);
  }
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }

  private elements = {
    logoutButton: "//html/body/div[1]/div/ul/li[2]/a",
    weatherInput: "//html/body/div[2]/div/form/input",
    CheckWeatherButton: "//html/body/div[2]/div/form/button",
  };

  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }
  async logOut() {
    await this.page.locator(this.elements.logoutButton).click();
  }
  async searchCity(city: string) {
    const cityInput = await this.page.locator(this.elements.weatherInput);
    await cityInput.fill(city);
    await this.page.locator(this.elements.CheckWeatherButton).click();
  }
}
