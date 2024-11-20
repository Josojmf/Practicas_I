import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Browser, Page } from 'playwright';
import LoginPage from '../../../pages/PythonWebServicePages/loginPage';
import HomePage from '../../../pages/PythonWebServicePages/homePage';
import { pageF } from '../../../hooks/pageF';


let browser: Browser;
let page: Page;
let loginP: LoginPage;
let homeP: HomePage;

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

// Step Definitions
Given('User is in the login page', async () => {
    loginP= new LoginPage(pageF.page);
    await pageF.page.goto('http://127.0.0.1:5000/login');
    await loginP.waitForNavigation();
});

When('I enter {string} credentials', async function (user:string){
    loginP= new LoginPage(pageF.page);
    await loginP.loginAs(user);
});
Then('I should see the admin page', async () => {
    await pageF.page.goto('http://127.0.0.1:5000/admin'); // Update with actual admin page URL
    const url= await pageF.page.url();
    await expect(url).toContain('admin');
});



Then('I should see an error message', async () => {
    const errorMessage = await pageF.page.locator('.flash-messages'); // Replace with actual error message selector
    await expect(errorMessage).toBeVisible();

});                

When('I dont enter any credentials', async () => {
    loginP= new LoginPage(pageF.page);
    await loginP.checkLoginButtonDisabled();
});
Then('Login Button should be disabled', async function () {
    loginP= new LoginPage(pageF.page);
    await loginP.checkLoginButtonDisabled();
  });