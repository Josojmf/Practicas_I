import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import loginPage from "../../pages/mlaPage";
import { pageF } from "../../hooks/pageF";
import AcademicohomePage from "../../pages/AcademicoNebrijaPages/homePage";
import AdmisionesPage from "../../pages/AcademicoNebrijaPages/AdmisionesPage";
import { expect } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";
setDefaultTimeout(60 * 1000);

let loginP: loginPage;
let homePage: AcademicohomePage;
let AdmisionesP: AdmisionesPage;


//Test of admisiones page
Given(
    "User is logged in as validuser in academico nebrija page for validation of Admisiones page",
    async function () {
      loginP = new loginPage(pageF.page);
      await loginP.navigateLoginPage();
      loginP.loginAs("validuser");
      await loginP.WaitForUserToInputVerificationCode();
      await loginP.clickKeepMeSignedIn();
      await loginP.SaveCookiesState();
      homePage = new AcademicohomePage(pageF.page);
      await homePage.waitForNavigation();
    }
  );
  
  When("User clicks Admisiones tab", async function () {
    homePage = new AcademicohomePage(pageF.page);
    homePage.clickAdmisionesTab();
    AdmisionesP = new AdmisionesPage(pageF.page);
    await AdmisionesP.waitForNavigation();
    

  });
Then("User should see the Admisiones dropdown", async function () {
    homePage = new AcademicohomePage(pageF.page);
    await homePage.waitForNavigation();
    homePage.clickAdmisionesTab();
    const dropdown = await homePage.checkAdmisionesDropdown();
  });
  Then("User clicks on reconocimiento de creditos tab", async function () {
    homePage = new AcademicohomePage(pageF.page);
     homePage.clickReconocimientoTab();
    AdmisionesP = new AdmisionesPage(pageF.page);
    await AdmisionesP.waitForNavigation();
    const reconocimentosTitle= await AdmisionesP.checkReconocimientoCreditosPage();
    await expect(reconocimentosTitle).toBe("Reconocimiento de créditos");
  });
  