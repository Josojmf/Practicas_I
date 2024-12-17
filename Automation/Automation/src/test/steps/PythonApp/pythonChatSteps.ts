import {
  Given,
  When,
  Then,
  Before,
  After,
  BeforeAll,
} from "@cucumber/cucumber";
import { BrowserContext, expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";
import LoginPage from "../../../pages/PythonWebServicePages/loginPage";
import HomePage from "../../../pages/PythonWebServicePages/homePage";
import { pageF } from "../../../hooks/pageF";
import ChatPage from "../../../pages/PythonWebServicePages/ChatPage";
import FilesPage from "../../../pages/PythonWebServicePages/FilesPage";
import { AdminPage } from "../../../pages/PythonWebServicePages/AdminPage";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginP: LoginPage;
let chatpP: ChatPage;
let homeP: HomePage;
let FilesP: FilesPage;
let adminP: AdminPage;


// Before and After hooks to manage browser lifecycle

Given("User is in the {string} page", async (page: string) => {
  if (page == "home") {
    await pageF.page.goto(`http://localhost:5000/`);
  } else {
    await pageF.page.goto(`http://localhost:5000/${page}`);
  }
  switch (page) {
    case "chat":
      chatpP = new ChatPage(pageF.page);
      chatpP.waitForNavigation();
      break;
    case "home":
      homeP = new HomePage(pageF.page);
      homeP.waitForNavigation();
      break;
    case "login":
      loginP = new LoginPage(pageF.page);
      loginP.waitForNavigation();
      break;
    case "files":
      FilesP = new FilesPage(pageF.page);
      FilesP.waitForNavigation();
      break;
    case "admin":
      adminP = new AdminPage(pageF.page);
      adminP.waitForNavigation();
      break
  }
});

Then("User logs in as {string}", async (user: string) => {
  loginP = new LoginPage(pageF.page);
  loginP.waitForNavigation();
  loginP.loginAs(user);
});

Then("User clicks on {string}", async (button: string) => {
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
      chatpP = new ChatPage(pageF.page);
      await chatpP.clickLogoutButton();
      break;
  }
});

When("I enter {string} in the message box", async (message: string) => {
  chatpP = new ChatPage(pageF.page);
  await chatpP.enterMessage(message);
});
When("I click on send button", async () => {
  chatpP = new ChatPage(pageF.page);
  await chatpP.clickSendButton();
});

When('User disconnects from the internet inmeddiateley', async function () {
   browser = await chromium.launch();
   context = await browser.newContext();
   page = await context.newPage();
  await context.setOffline(true);
});

When("User reconnects to the internet", async () => {
  context = await browser.newContext();
  await context.setOffline(false);
});

Then(
  "I should see the message with text {string} in the chat window",
  async (message: string) => {
    chatpP = new ChatPage(pageF.page);
    const Allmessages = await chatpP.getMessages();
    Allmessages.forEach((message) => {
      expect(message).toContain(message);
    });
  }
);

Then("User logs out", async () => {
  chatpP = new ChatPage(pageF.page);
});
