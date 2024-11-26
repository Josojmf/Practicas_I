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
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

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

AfterAll(async function () {
  const PORT = 5555;
  const reportPath = path.join(__dirname, '../../test-result/reports/cucumber_report.html');

  const server = http.createServer((req, res) => {
    if (req.url === '/') {
      // Serve the cucumber report HTML file
      fs.readFile(reportPath, (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error loading report');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

  server.listen(PORT, () => {
    console.log(`Cucumber report server running at http://localhost:${PORT}`);
    //launch chromium browser to open the report
    const { exec } = require('child_process');
    exec(`start chrome http://localhost:${PORT}`);
    
  });
});



