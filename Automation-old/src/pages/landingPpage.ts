import wrapperFunctions from "../helper/wrapper/wrapperFunctions";
import { Page } from "@playwright/test";

export default class LandingPage {
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }
  async navigateLoginPage() {
    let appUrl = wrapperFunctions.getAppUrl();

    await this.page.goto(appUrl!, {
      timeout: 60 * 1000,
      waitUntil: "domcontentloaded",
    });
  }

 async clickAccesoUsuariosButton(){
    await this.page.waitForSelector("text=Acceso Usuarios");
    await this.page.locator("text=Acceso Usuarios").click();
  }
}
