import { LaunchOptions,firefox,webkit } from "@playwright/test";
import { chromium } from "playwright";

const options: LaunchOptions = {
    headless: true,
}


export const invokeLocalBrowser = () =>{
    const browserType= process.env.npm_config_BWSR || "chrome";
    switch(browserType){
        case "chrome":
            return chromium.launch(options)
        case "firefox":
            return firefox.launch(options)
        case "webkit":
            return webkit.launch(options)
        default:
            return chromium.launch(options)
    }
}