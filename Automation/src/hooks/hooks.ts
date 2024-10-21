import {
  BeforeAll,
  AfterAll,
  After,
  Before,
  Status,
  AfterStep,
} from "@cucumber/cucumber";
import {
  Browser,
  BrowserContext,
  ChromiumBrowser,
  WebKitBrowser,
} from "@playwright/test";
import { pageF } from "../hooks/pageF";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const { chromium } = require("playwright");

let browser: Browser | ChromiumBrowser | WebKitBrowser;
let context: BrowserContext;

BeforeAll(async function () {
  try {
    let env = process.env.ENV;

    if (env === "local") {
      try {
        browser = await chromium.launch({ headless: false });
      } catch (e) {
        console.log("Error: " + e);
      }
    }
    console.log("Tag for apps: " + process.env.APPS);
    console.log("Tag for tags " + process.env.TAGS);
    console.log("Tag for Browsers: " + process.env.BWSR);
  } catch (e) {
    console.log("Error: " + e);
  }
});

Before(async function ({ pickle }) {
  try {
    let scenarioName = pickle.name + pickle.id;
    context = await browser.newContext();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    pageF.page = page;
    pageF.logger = createLogger(options(scenarioName));
    console.log("Browser opened correctly");
  } catch (e) {
    console.log("Error: " + e);
  }
});

AfterStep(async function ({ pickle, result }) {
  let scenarioName = pickle.name;
  if (result?.status === Status.FAILED) {
    const img = await pageF.page.screenshot({
      path: `./screenshots/${scenarioName}.png`,
    });
    await this.attach(img, "image/png");
  }
  if (result?.status === Status.AMBIGUOUS) {
    const img = await pageF.page.screenshot({
      path: `./screenshots/${scenarioName}.png`,
    });
    await this.attach(img, "image/png");
  }
});

After(async function ({ pickle, result }) {
  let scenarioName = pickle.name;
  if (result?.status === Status.FAILED) {
    const img = await pageF.page.screenshot({
      path: `./screenshots/${scenarioName}.png`,
    });
    await this.attach(img, "image/png");
  }
  if (result?.status === Status.AMBIGUOUS) {
    const img = await pageF.page.screenshot({
      path: `./screenshots/${scenarioName}.png`,
    });
    await this.attach(img, "image/png");
  }
 // await pageF.page.close();
  //await context.close();
});


