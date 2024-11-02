import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Browser, Page } from 'playwright';
import LoginPage from '../../pages/PythonWebServicePages/loginPage';
import { pageF } from '../../hooks/pageF';
import HomePage from '../../pages/PythonWebServicePages/homePage';

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
    await loginP.waitForNavigation();
});

When('I enter valid credentials', async () => {
    loginP= new LoginPage(pageF.page);
    loginP.waitForNavigation();
    await loginP.loginAs('validUserPython'); 
})

When('I enter invalid credentials', async () => {
    loginP= new LoginPage(pageF.page);
    await loginP.loginAs('invalidUserPython'); // Update with invalid credentials
});

When('I enter empty credentials', async () => {
    await loginP.loginAs(''); // Sending empty credentials
});

When('I enter admin credentials', async () => {
    await loginP.loginAs('admin'); // Update with actual admin credentials
});

Then('I should see the home page', async () => {
    homeP= new HomePage(pageF.page);
    await pageF.page.waitForTimeout(2000);
    await expect(pageF.page.url()).toBe('http://127.0.0.1:5000/'); // Update with actual home page URL
    const homePtitle = homeP.verifyHomePage();
});

Then('I should see an error message', async () => {
    const errorMessage = await page.textContent('.error-message'); // Replace with actual error message selector
    expect(errorMessage).toContain('Invalid credentials'); // Update error message text as needed
});

Then('I should see the admin page', async () => {
    await page.waitForSelector('#adminDashboard'); // Replace with an actual selector on the admin page
    expect(await page.url()).toBe('http://127.0.0.1:5000/admin'); // Verify admin page URL
});
