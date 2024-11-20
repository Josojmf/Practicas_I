import {
  Given,
  When,
  Then,
  Before,
  After,
  BeforeAll,
} from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";
import LoginPage from "../../../pages/PythonWebServicePages/loginPage";
import HomePage from "../../../pages/PythonWebServicePages/homePage";
import { pageF } from "../../../hooks/pageF";
import ChatPage from "../../../pages/PythonWebServicePages/ChatPage";
import FilesPage from "../../../pages/PythonWebServicePages/FilesPage";
import WeatherPage from "../../../pages/PythonWebServicePages/WeatherPage";
import WeatherResultsPage from "../../../pages/PythonWebServicePages/WeatherResultPage";

type responseResultsPage = {
  cityTitle: boolean;
  cityTemperature: boolean;
  description: boolean;
  windSpeed: boolean;
  humidity: boolean;
};

let browser: Browser;
let page: Page;
let homeP: HomePage;
let weatherP: WeatherPage;
let weatherPResultsP: WeatherResultsPage;

Then("User clicks on {string} on weather page", async (button: string) => {
  switch (button) {
  }
});
Then("User searches for city {string}", async function (city: string) {
  weatherP = new WeatherPage(pageF.page);
  weatherP.searchCity(city);
  await pageF.page.waitForLoadState("networkidle");
});
Then(
  "User should see the weather for {string} displayed",
  async (city: string) => {
    weatherPResultsP = new WeatherResultsPage(pageF.page);
    const isValid: responseResultsPage = await weatherPResultsP.CheckValidityFields();
  }
);
