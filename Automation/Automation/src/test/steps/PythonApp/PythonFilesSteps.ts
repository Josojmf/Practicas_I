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

let browser: Browser;
let page: Page;
let loginP: LoginPage;
let FilesP: FilesPage;
let homeP: HomePage;
let chatpP: ChatPage;




Then("User clicks on {string} on files page", async (button: string) => {
  switch (button) {
    case "expandablemenu":
      homeP = new HomePage(pageF.page);
      await homeP.clickExpandableMenu();
      break;
    case "loginButton":
      homeP = new HomePage(pageF.page);
      await homeP.ClickLoginButton();
      break;
    case "logoutButton":
      FilesP = new FilesPage(pageF.page);
      FilesP.logOut();
      break;
    case "uploadFileButton":
        FilesP = new FilesPage(pageF.page);
        FilesP.clickUploadFileButton();
        break;
  }
});

Then("User uploads file {string}", async (fileName: string) => {
  FilesP = new FilesPage(pageF.page);
  const filePath = `./src/assets/${fileName}.pdf`;
  FilesP.uploadFile(filePath);
  FilesP.clickUploadFileButton();
  FilesP.waitForNavigation();
});

Then("User should see the file {string} uploaded successfully", async (fileName: string) => {
  FilesP = new FilesPage(pageF.page);
  const fileUploaded = await FilesP.isFileUploaded(fileName);
  expect(fileUploaded).toBeTruthy();
});


Then("User logs out", async () => {
  FilesP = new FilesPage(pageF.page);
  FilesP.waitForNavigation();
  FilesP.logOut();
});
