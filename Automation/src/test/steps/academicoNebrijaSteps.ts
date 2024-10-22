import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import loginPage from "../../pages/mlaPage";
import { pageF } from "../../hooks/pageF";
import AcademicohomePage from "../../pages/AcademicoNebrijaPages/homePage";
import { expect } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";
setDefaultTimeout(60 * 1000);

let loginP: loginPage;
let homePage: AcademicohomePage;

Given(
  "User is logged in as validuser in academico nebrija page",
  async function () {
    loginP = new loginPage(pageF.page);
    await loginP.navigateLoginPage();
    loginP.loginAs("validuser");
    await loginP.WaitForUserToInputVerificationCode();
    await loginP.clickKeepMeSignedIn();
    await loginP.SaveCookiesState();
  }
);

When("I navigate to the Academico Nebrija page", async function () {
  homePage = new AcademicohomePage(pageF.page);
  await homePage.waitForNavigation();
});

Then("I should see the Academico Nebrija page", async function () {
  homePage = new AcademicohomePage(pageF.page);
  await homePage.waitForNavigation();
  const title = await homePage.checkAcademicoNebrijaPage();
  await expect(title).toBe("Portal de servicios");
  const UserDetails = await homePage.CheckUserDetails();
});

//test for searching a service

When("User searches for fechas in buscar un servicio input", async function () {
  homePage = new AcademicohomePage(pageF.page);
  await homePage.waitForNavigation();
  console.log("searching for fechas");
  await homePage.ServiceSearchFor("fechas");
});
Then("User should see a dropdown with results", async function () {
  homePage = new AcademicohomePage(pageF.page);
  await homePage.checkServiceSearchResults("fechas");
  console.log("search results are displayed");
});

//test for invalid user

Given("User tries to log in with invalid user", async function () {
  loginP = new loginPage(pageF.page);
  await loginP.navigateLoginPage();
  loginP.loginAs("notvaliduser");
});

Then('User should see an error message with invalid user', async function () {
  loginP = new loginPage(pageF.page);
  const error = await loginP.checkError();
  await expect(error).toBe(
    "No se ha podido encontrar una cuenta con ese nombre de usuario."
  );
});

//test for valid user and wrong password
Given("User tries to log in with correct user but wrong pass", async function () {
  loginP = new loginPage(pageF.page);
  await loginP.navigateLoginPage();
  loginP.loginAs("ValidUserWrongPass");
});

Then("User should see an error message", async function () {
  loginP = new loginPage(pageF.page);
  const error = await loginP.checkError();
  await expect(error).toBe(
    "No se ha podido encontrar una cuenta con ese nombre de usuario."
  );
});

//test for empty user

Given("User tries to log in with empty user", async function () {
  loginP = new loginPage(pageF.page);
  await loginP.navigateLoginPage();
  loginP.loginAsEmpty();
});

Then("User should see an error message about empty field", async function () {
  loginP = new loginPage(pageF.page);
  const error = await loginP.checkError();
  await expect(error).toBe("Escriba una dirección de correo electrónico, un número de teléfono o un nombre Skype válidos.");
});

//test for right username but wrong pass

Given("User tries to log in with validuser but wrong password", async function () {
  loginP = new loginPage(pageF.page);
  loginP = new loginPage(pageF.page);
  await loginP.navigateLoginPage();
  loginP.loginAs("validuserwrongpass");
});
Then("User should see an error message about invalid password", async function () {
  loginP = new loginPage(pageF.page);
  const error = await loginP.PasscheckError();
  await expect(error).toBe("Su cuenta o contraseña no es correcta. Si no recuerda su contraseña, puede restablecerla ahora.");
});
