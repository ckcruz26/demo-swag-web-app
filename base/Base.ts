import { Page, Locator, expect } from "@playwright/test";

export default abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async open(url: string) {
    await this.page.goto(url);
    await this.waitForPageReady();
  }

  async close() {
    await this.page.close();
  }

  async waitForPageReady() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
  }

  async click(selector: string) {
    const el = this.locator(selector);
    await expect(el).toBeVisible();
    await expect(el).toBeEnabled();
    await el.click();
  }

  async type(selector: string, text: string) {
    const el = this.locator(selector);
    await expect(el).toBeVisible();
    await el.fill(text);
  }
  async containsLinkValue(urlTxt: string) {
     await expect(this.page).toHaveURL(new RegExp(urlTxt));
  }

  async containsTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async notContainsTitle(title: string) {
    await expect(this.page).not.toHaveTitle(title);
  }

  async notContainsLinkValue(urlTxt: string) {
    await expect(this.page).not.toHaveURL(new RegExp(urlTxt));
  }

  async expectVisible(selector: string) {
    await expect(this.locator(selector)).toBeVisible();
  }

  async toContainsTextInElement(selector : string, errorMsg : string){
    await expect(this.page.locator(selector)).toHaveText(errorMsg);
  }
}
