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
import { AdminPage } from "../../../pages/PythonWebServicePages/AdminPage";
import { MongoClient } from "mongodb";
import { ManageUsersPage } from "../../../pages/PythonWebServicePages/manageUsersPage";
import { SystemLogsPage } from "../../../pages/PythonWebServicePages/systemLogsPage";
import { SiteSettingsPage } from "../../../pages/PythonWebServicePages/SiteSettingsPage";

let adminP: AdminPage;
let manageUsersPage: ManageUsersPage;
let viewSystemLogsPage: SystemLogsPage;
let siteSettingsPage: SiteSettingsPage;

let DB_USERNAME: string;
let DB_PASSWORD: string;
let DB_CLUSTER: string;
let DB_NAME: string;
let DB_USERS_COLLECTION: string;

Then("User should see {string} link", async (link: string) => {
  adminP = new AdminPage(pageF.page);
  await adminP.waitForNavigation();
  const linkText = await adminP.getLinkText(link);
  expect(linkText).toBeTruthy();
});
When("User clicks on {string} link", async (link: string) => {
  adminP = new AdminPage(pageF.page);
  await adminP.waitForNavigation();
  await adminP.clickLink(link);
});

Then("User should see {string} title", async (title: string) => {
  adminP = new AdminPage(pageF.page);
  await adminP.waitForNavigation();
  switch (title) {
    case "Manage Users":
      manageUsersPage = new ManageUsersPage(pageF.page);
      await manageUsersPage.checkManageUsersnPage(pageF.page.url());
      break;
    case "View System Logs":
      viewSystemLogsPage = new SystemLogsPage(pageF.page);
      await viewSystemLogsPage.checkManageUsersnPage(pageF.page.url());
      break;
    case "Site Settings":
      siteSettingsPage = new SiteSettingsPage(pageF.page);
      await siteSettingsPage.checkManageUsersnPage(pageF.page.url());
      break;
  }
});
Then(
  "env variables are {string} {string} {string} {string} {string} {string} {string} {string}",
  async function (
    string,
    string2,
    string3, // This should be the cluster name
    string4,
    string5,
    string6,
    string7,
    string8
  ) {
    DB_USERNAME = string;
    DB_PASSWORD = string2;
    DB_CLUSTER = string3; // Ensure this is just "Final"
    DB_NAME = string4;
    DB_USERS_COLLECTION = string5;
  }
);

Then(
  "User should see total users number {string}",
  async function (numberUsers: string) {
    const expectedUsers = parseInt(numberUsers, 10); // Convert input to number

    // Get environment variables

    if (
      !DB_USERNAME ||
      !DB_PASSWORD ||
      !DB_CLUSTER ||
      !DB_NAME ||
      !DB_USERS_COLLECTION
    ) {
      console.log(
        "Missing environment variables for MongoDB connection:",
        DB_USERNAME,
        DB_PASSWORD,
        DB_CLUSTER,
        DB_NAME,
        DB_USERS_COLLECTION
      );
      throw new Error(
        "Missing environment variables for MongoDB connection: DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_NAME, DB_USERS_COLLECTION"
      );
    }

    // Create MongoDB connection string
    const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@final.yzzh9ig.mongodb.net/?retryWrites=true&w=majority&appName=Final`;

    let client: MongoClient;

    try {
      // Connect to the database
      client = new MongoClient(uri);
      await client.connect();

      // Access the collection
      const db = client.db(DB_NAME);
      const collection = db.collection(DB_USERS_COLLECTION);

      // Get the total user count
      const totalUsers = await collection.countDocuments();

      console.log(`Total users: ${totalUsers}`);
      expect(totalUsers).toBe(expectedUsers); // Assert the count matches
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    } finally {
      // Ensure the client is closed
      if (client) await client.close();
    }
  }
);
