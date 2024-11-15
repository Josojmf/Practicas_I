import { Expect,Page, expect } from "playwright/test";

export default class assert{
    constructor(private page: Page) {}
    async asserTitle(title: string){
        await expect(this.page).toHaveTitle(title)
    }
}