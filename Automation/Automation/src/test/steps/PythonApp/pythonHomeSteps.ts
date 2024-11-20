import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";
import LoginPage from "../../../pages/PythonWebServicePages/loginPage";
import HomePage from "../../../pages/PythonWebServicePages/homePage";
import { pageF } from "../../../hooks/pageF";
import FilesPage from "../../../pages/PythonWebServicePages/FilesPage";
import { AdminPage } from "../../../pages/PythonWebServicePages/AdminPage";
import ChatPage from "../../../pages/PythonWebServicePages/ChatPage";
import WeatherPage from "../../../pages/PythonWebServicePages/WeatherPage";

let browser: Browser;
let page: Page;
let loginP: LoginPage;
let homeP: HomePage;
let filesP: FilesPage;
let weatherP: WeatherPage;
let chatP: ChatPage;
let adminP: AdminPage;

type MenusVisibleReturn = {
  viewFiles: boolean;
  checkWeather: boolean;
  chat: boolean;
  adminDashboard: boolean;
};

// Before and After hooks to manage browser lifecycle
Before(async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginP = new LoginPage(page);
});

After(async () => {
  await page.close();
  await browser.close();
});

Then("I should see the home page", async () => {
  const possibleHomePages = [
    "http://localhost:5000/",
    "http://127.0.0.1:5000/",
    "http://localhost:5000",
  ]; // Update with actual home page URLs
  homeP = new HomePage(pageF.page);
  await pageF.page.waitForTimeout(2000);
  await expect(possibleHomePages).toContain(pageF.page.url());
  const homePtitle = homeP.verifyHomePage();
});
Then("I should see the four menus", async () => {
  homeP = new HomePage(pageF.page);
  const menusVisible: MenusVisibleReturn = await homeP.checkFourMenus();
  await expect(menusVisible.viewFiles).toBeTruthy();
  await expect(menusVisible.checkWeather).toBeTruthy();
  await expect(menusVisible.chat).toBeTruthy();
  await expect(menusVisible.adminDashboard).toBeTruthy();
});
When("I click the {string} link", async (link: string) => {
  homeP = new HomePage(pageF.page);

  homeP.waitForNavigation();
  switch (link) {
    case "View Files":
      await homeP.clickViewFilesLink();
      filesP = new FilesPage(pageF.page);
      filesP.waitForNavigation();
      break;
    case "Weather":
        await homeP.clickCheckWeatherLink();
        weatherP = new WeatherPage(pageF.page);
        weatherP.waitForNavigation();
      break;
    case "Chat":
        await homeP.clickChatLink();
        chatP = new ChatPage(pageF.page);
        chatP.waitForNavigation();
      break;
    case "Admin Dashboard":
        await homeP.clickAdminDashboardLink();
        adminP = new AdminPage(pageF.page);
        adminP.waitForNavigation();
      break;
  }
});
Then("I should see the {string} page", async (pageName: string) => {
  console.log(pageName);
  console.log(pageF.page.url());
  await pageF.page.goto("http://localhost:5000/");
  let homePage = new HomePage(pageF.page);
  homePage.waitForNavigation();
});
