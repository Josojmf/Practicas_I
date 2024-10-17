import { test, expect } from "@playwright/test";
import { Given, Then, When } from "@cucumber/cucumber";
import LoginPage from "../../pages/loginPage";
import LandingPage from "../../pages/landingPpage";
import { type Page } from "@playwright/test";
import * as users from "../../data/users.json" ;

let loginP: LoginPage;
let landingPage: LandingPage;
/*
Given("I am on the landing page", async function () {
  await landingPage.navigateLoginPage();
  await landingPage.clickAccesoUsuariosButton();
});

When("I click login button", async ({ page }) => {
  await landingPage.clickAccesoUsuariosButton();
});

Then("I should be redirected to mla page", async ({ page }) => {
  const MlaPage = new LoginPage(page);
});
*/

test.beforeEach(async ({ page : Page }) => {
  await Page.goto("https://nebrija.blackboard.com/");
});

test("LoginValidCredentials", async ({ page }: { page:Page }) => {
  const authFile = "auth.json";
  const AccesoButton = await page.locator("text=Acceso");
  await AccesoButton.click();
  await page.waitForNavigation();
  const logiMailInput = await page.locator("#i0116");
  const ValidEmail = users.users.user1;
  const validPwd = users.passwords.password1;
  await logiMailInput.fill(ValidEmail);
  const nextButton = await page.locator("#idSIButton9");
  await nextButton.click();
  await page.waitForNavigation();
  const pwdInput = await page.locator("#i0118");
  await page.waitForTimeout(1000);
  await pwdInput.fill(validPwd);
  await page.waitForTimeout(1000);
  const submitButton = await page.locator("#idSIButton9");
  await submitButton.click();
  await page.waitForNavigation();
  const VerificationOption = await page.locator("text=Text");
  await VerificationOption.click();
  const amountOfNumbersInput = await page.locator("#idTxtBx_SAOTCC_OTC");
  await page.waitForTimeout(10000);
  const staySignedInCheckBox = await page.getByRole("checkbox");
  await staySignedInCheckBox.check();
  await nextButton.click();
  await page.waitForTimeout(10000);
  await page.pause();
  //microsoft mobile auth
});

test("LoginInvalidUsername", async ({ page }: { page:Page }) => {
  const authFile = "auth.json";
  const AccesoButton = await page.locator("text=Acceso");
  await AccesoButton.click();
  await page.waitForNavigation();
  const logiMailInput = await page.locator("#i0116");
  await logiMailInput.fill("NotValidEmail@nebrija.es");
  const nextButton = await page.locator("#idSIButton9");
  await nextButton.click();
  const error = await page.locator("#usernameError");
  await expect(error).not.toBeNull();
});

test("LoginInvalidPassword", async ({ page }: { page:Page }) => {
  const authFile = "auth.json";
  const AccesoButton = await page.locator("text=Acceso");
  await AccesoButton.click();
  await page.waitForNavigation();
  const logiMailInput = await page.locator("#i0116");
  const ValidEmail = users.users.user1;
  await logiMailInput.fill(ValidEmail);
  const nextButton = await page.locator("#idSIButton9");
  await nextButton.click();
  await page.waitForNavigation();
  const pwdInput = await page.locator("#i0118");
  await page.waitForTimeout(1000);
  await pwdInput.fill("NotValidPassword");
  await page.waitForTimeout(1000);
  const submitButton = await page.locator("#idSIButton9");
  await submitButton.click();
  const error = await page.locator("#passwordError");
  await expect(error).not.toBeNull();
});

Given("I am on the login page", async ({ page:Page }) => {});
