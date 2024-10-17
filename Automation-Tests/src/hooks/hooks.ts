import {BeforeAll, AfterAll, Before, After, AfterStep,Status} from "@cucumber/cucumber";
import {Browser,BrowserContext, ChromiumBrowser, WebKitBrowser } from "@playwright/test";
import { pageF } from "./pageF";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const chromium = require("playwright");

let browser: Browser | ChromiumBrowser | WebKitBrowser;
let context: BrowserContext;
BeforeAll(async function () {
    try{
        let env = process.env.ENV
        if(env === "local"){
            try{
                browser= await chromium.launch({headless: false})
            }catch(error){
                console.log("Error: ", error)
            }
        }
    } catch(error){
        console.log("Error: ", error)
    }
})

Before(async function ({pickle}) {
    try{
        let scenarioName = pickle.name + pickle.id
        context = await browser.newContext();
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });
        pageF.logger = createLogger(options(scenarioName));
        console.log("Browser is open properly")
    }catch(error){
        console.log("Error: ", error)
    }
})

AfterStep(async function ({pickle,result}) {
    let scenarioName = pickle.name;
    if(result?.status === Status.FAILED){
        const img = await pageF.page.screenshot({path: `test-result/screenshots/${scenarioName}.png`})
        await this.attach(img, "image/png")
        pageF.logger.error("Step failed: ", pickle.name)
    }
})

AfterAll(async function () {
    try{
        await browser.close();
        pageF.logger.close();
    }catch(error){
        console.log("Error: ", error)
    }
})