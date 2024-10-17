import { Expect, Page, expect } from "@playwright/test";

export default class assert {
  constructor(private page: Page) {}
  async assertTitle(title: string) {
    await expect(this.page.title()).toBe(title);
  }
}
