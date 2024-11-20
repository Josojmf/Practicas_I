import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";
import { log } from "console";

export default class WeatherResultsPage {
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }

  private elements = {
    logoutButton: "//html/body/div[1]/div/ul/li[2]/a",
    cityTitle: "//html/body/div[2]/header/h1",
    cityTemperature: "//html/body/div[2]/div/p[1]",
    description: "//html/body/div[2]/div/p[2]",
    windSpeed: "//html/body/div[2]/div/p[3]",
    humidity: "//html/body/div[2]/div/p[4]",
  };

  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }
  async logOut() {
    await this.page.locator(this.elements.logoutButton).click();
  }
  async CheckValidityFields() {
    console.log("Checking if the fields are displayed");
    console.log(await this.page.locator(this.elements.cityTitle).textContent());
    const cityTitle = await this.page
      .locator(this.elements.cityTitle)
      .isVisible();
    const cityTemperature = await this.page
      .locator(this.elements.cityTemperature)
      .isVisible();
    const description = await this.page
      .locator(this.elements.description)
      .isVisible();
    const windSpeed = await this.page
      .locator(this.elements.windSpeed)
      .isVisible();
    const humidity = await this.page
      .locator(this.elements.humidity)
      .isVisible();
    return {
      cityTitle: cityTitle,
      cityTemperature: cityTemperature,
      description: description,
      windSpeed: windSpeed,
      humidity: humidity,
    };
  }
}
