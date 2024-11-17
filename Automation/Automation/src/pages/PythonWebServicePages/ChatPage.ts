import { expect, Page } from "@playwright/test";
import wrapperFunctions from "../../helper/wrapper/wrapperFunctions";
import { log } from "console";

export default class ChatPage {
  private base: wrapperFunctions;

  constructor(private page: Page) {
    this.page = page;
    this.base = new wrapperFunctions(page);
  }

  private elements = {
    chatTitle: "//html/body/div[2]/header/h1",
    chatInput: "//html/body/div[2]/div/form/input",
    chatSendButton: "//html/body/div[2]/div/form/button",
    chatMessages: ".message received",
    logoutButton: "//html/body/div[1]/div/ul/li[2]/a",
  };

  async waitForNavigation() {
    await this.page.waitForLoadState("networkidle");
  }

  async verifyChatPage() {
    const title = await this.page.locator(this.elements.chatTitle).innerText();
    return title;
  }

  async enterMessage(message: string) {
    await this.page.locator(this.elements.chatInput).fill(message);
  }

  async clickSendButton() {
    await this.page.locator(this.elements.chatSendButton).click();
  }
  async getMessages() {
    const messageElements = await this.page
      .locator(this.elements.chatMessages)
      .all();
    const messages: string[] = await Promise.all(
      messageElements.map(async (message) => {
        return await message.innerText();
      })
    );
    return messages;
  }

  async clickLogoutButton() {
    await this.page.locator(this.elements.logoutButton).click();
  }
}
