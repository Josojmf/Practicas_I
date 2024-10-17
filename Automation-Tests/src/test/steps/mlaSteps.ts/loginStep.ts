import { Given, Then } from "@cucumber/cucumber";
import loginPage from "../../../pages/mlaPage/mlaPage";
import { pageF } from "../../../hooks/pageF";

const { setDefaultTimeout } = require("@cucumber/cucumber");

let loginP: loginPage;
let env = process.env.ENV;

setDefaultTimeout(60 * 1000); // 60 seconds
Given("User is logged in as {string}", async function (username) {
  loginP = new loginPage(pageF.page);
  await loginP.navigateLoginPage();
  await loginP.loginAs(username);
});

Given('User enters username as {string}', async function (username) {
    pageF.logger.info(`User enters username as ${username}`);
    await loginP.setUsernameLogin(username);
});
Given('User clicks on Next button', async function (){
    pageF.logger.info(`User clicks on Next button`);
    await loginP.clickNextButtonLogin();
})
Given('User types the {string} pwd', async function (userPwd) {
    pageF.logger.info(`User types the ${userPwd} pwd`);
    await loginP.typePwdLogin(userPwd);
})
Then('Login should be success', async function () {
    pageF.logger.info(`Login should be success`);
})
