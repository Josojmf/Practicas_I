import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";
import LoginPage from "../../../pages/PythonWebServicePages/loginPage";
import HomePage from "../../../pages/PythonWebServicePages/homePage";
import { pageF } from "../../../hooks/pageF";
import RegisterPage from "../../../pages/PythonWebServicePages/registerPage";

let browser: Browser;
let page: Page;
let registerP: RegisterPage;
let loginP: LoginPage;
let homeP: HomePage;

// Before and After hooks to manage browser lifecycle
Before(async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  registerP = new RegisterPage(page);
});

After(async () => {
  await page.close();
  await browser.close();
});

// Step Definitions
Given("User is in the register page", async () => {
    registerP = new RegisterPage(pageF.page);
  await pageF.page.goto("http://127.0.0.1:5000/register");
  await registerP.waitForNavigation();
});
When("I enter new credentials credentials for registration", async function () {
    registerP = new RegisterPage(pageF.page);
    let newUserplusrandom = "newuser" + Math.floor(Math.random() * 1000);
    await registerP.registerAs(newUserplusrandom, "password");
});
Then("I should see confirmation message", async () => {
    loginP = new LoginPage(pageF.page);
    await loginP.checkRegisterConfirmation();
});
When("I enter existing credentials credentials for registration", async function () {
    registerP = new RegisterPage(pageF.page);
    let newUserplusrandom = "admin";
    await registerP.registerAs(newUserplusrandom, "password");
});
Then("I should see error message", async function () {
    registerP = new RegisterPage(pageF.page);
    await registerP.checkRegisterError();

});