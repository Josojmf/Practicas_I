import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";
import { log } from "console";

export default class FilesPage {
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }

  private elements = {

    logoutButton: "//html/body/div[1]/div/ul/li[2]/a",
    uploadFilesInput:"//html/body/div[2]/div/form/div/input",
    uploadFileButton: "text=Upload File",
    errorMessage:"//html/body/div[2]/div/div/div"
  };

  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }
  async logOut() {
    await this.page.locator(this.elements.logoutButton).click();
  }

  async checkFilesPage(url: string) {
    await expect(this.page.url()).toContain(url);
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles(this.elements.uploadFilesInput, filePath);
  }
async clickUploadFileButton() {
    await this.page.getByRole('button', { name: 'Upload' }).click();
  }
async isFileUploaded(fileName: string) {
    const fileUploaded = await this.page.locator(`text=${fileName}`).isVisible();
    return fileUploaded;
  }

  async isErrorMessageDisplayed() {
    const errorMessage = await this.page.locator(this.elements.errorMessage);
    console.log(errorMessage);
    await this.page.pause();
    return errorMessage;
  }


}
