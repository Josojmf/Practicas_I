import { Given, Then, When } from "@cucumber/cucumber";
import loginPage from "../../pages/mlaPage/mlaPage";
import PortalServiciosLandingPage from "../../pages/PortalServiciosPages/portalServiciosLandingPage";
import { pageF } from "../../hooks/pageF";
import { expect, type Page } from "@playwright/test";

let loginP: loginPage;
let homePage: PortalServiciosLandingPage;

Given('User is logged in as valid user on portal de servicios', async function () {
    loginP = new loginPage(pageF.page);
    loginP.navigateLoginPage();
    await loginP.loginAs("validUser");
  }
);
When('User is in main page of portal de servicios', async function () {
  homePage = new PortalServiciosLandingPage(pageF.page);
  await homePage.waitForNavigation();
});
Then(
  "User should be able to see the url containing {string}",
  async function (string) {
    homePage = new PortalServiciosLandingPage(pageF.page);
    const url = await homePage.ReturnHomePageUrl();
    await expect(url).toContain(string);
  }
);
