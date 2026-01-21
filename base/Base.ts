import { Page, Locator, expect } from "@playwright/test";

export default abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* =====================
     Locator Resolver
  ===================== */
  protected resolveLocator(selector: string | Locator): Locator {
    return typeof selector === "string"
      ? this.page.locator(selector)
      : selector;
  }

  /* =====================
     Page Actions
  ===================== */
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

async scrollPage(
  direction: "up" | "down" | "left" | "right",
  distance: number = 500
) {
  let x = 0;
  let y = 0;

  switch (direction) {
    case "up":
      y = -distance;
      break;
    case "down":
      y = distance;
      break;
    case "left":
      x = -distance;
      break;
    case "right":
      x = distance;
      break;
  }

  await this.page.evaluate(
    ({ x, y }) => window.scrollBy(x, y),
    { x, y }
  );
}

  /* =====================
     Element Actions
  ===================== */
  async click(selector: string | Locator) {
    const el = this.resolveLocator(selector);
    // await expect(el).toBeVisible();
    // await expect(el).toBeEnabled();
    await el.click();
  }

  async getByText(text: string) {
    return this.page.getByText(text);
  }

  async type(selector: string | Locator, text: string) {
    const el = this.resolveLocator(selector);
    await expect(el).toBeVisible();
    await el.fill(text);
  }

  async toBeVisibleElement(selector: string | Locator) {
    const el = this.resolveLocator(selector);
    await expect(el).toBeVisible();
  }

  async getByLocator(selector: string) {
    return await this.page.locator(selector);
  }
  async expectVisible(selector: string | Locator) {
    const el = this.resolveLocator(selector);
    await expect(el).toBeVisible();
  }

  async waitForSelectorVisible(selector: string) {
    await this.page.waitForSelector(selector, { state: "visible" });
  }

  async notToBeNull(value: string) {
    await expect(value).not.toBeNull();
  }

  async expectHidden(selector: string | Locator) {
    const el = this.resolveLocator(selector);
    await expect(el).toBeHidden();
  }

  async expectText(selector: string | Locator, text: string) {
    const el = this.resolveLocator(selector);
    await expect(el).toHaveText(text);
  }

  async isElementDisabled(selector: string | Locator) {
    const el = this.resolveLocator(selector);
    await expect(el).toBeDisabled();
  }

  async toBeGreaterThanValue(count: number, expectedValue: number) {
    await expect(count).toBeGreaterThan(expectedValue);
  }
  async toBeEqualValue(count: number, expectedValue: number) {
    await expect(count).toEqual(expectedValue);
  }

  async toHaveCount(selector: string | Locator, count: number) {
    const el = this.resolveLocator(selector);
    await expect(el).toHaveCount(count);
  }

  async isElementEnabled(selector: string | Locator) {
    const el = this.resolveLocator(selector);
    await expect(el).toBeEnabled();
  }

  /* =====================
     URL & Title Assertions
  ===================== */
  async containsLinkValue(urlTxt: string) {
    await expect(this.page).toHaveURL(new RegExp(urlTxt));
  }

  async notContainsLinkValue(urlTxt: string) {
    await expect(this.page).not.toHaveURL(new RegExp(urlTxt));
  }

  async containsTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async notContainsTitle(title: string) {
    await expect(this.page).not.toHaveTitle(title);
  }

  async toContainsTextInElement(
    selector: string | Locator,
    text: string | RegExp
  ) {
    const el = this.resolveLocator(selector);
    await expect(el).toContainText(text);
  }

  async toHaveCountInElement(selector: string | Locator, count: number) {
    const el = this.resolveLocator(selector);
    await expect(el).toHaveCount(count);
  }

  async toHaveAttributeInElement(
    selector: string | Locator,
    attribute: string,
    value: string | RegExp
  ) {
    const el = this.resolveLocator(selector);
    await expect(el).toHaveAttribute(attribute, value);
  }

  async selectFromDropdown(dropdown: string, optionText: string) {
    await this.page.selectOption(dropdown, { label: optionText });
  }

  /* =====================
     Accessibility
  ===================== */
  getElementByRole(
    role: Parameters<Page["getByRole"]>[0],
    name: string
  ): Locator {
    return this.page.getByRole(role, { name });
  }

  /* =====================
     Utilities
  ===================== */
  async waitForTimeoutElement(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  /*
    @description: Moves the slider thumb to a specified offset.
  */
  async dragThumb(locator: Locator, offsetX: number) {
    const box = await locator.boundingBox();
    if (!box) return;

    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    await this.page.mouse.move(centerX, centerY);
    await this.page.mouse.down();
    await this.page.mouse.move(centerX + offsetX, centerY, { steps: 5 });
    await this.page.mouse.up();
  }

  async selectDateRange(start: string, end: string) {
    await this.click(`[data-date="${start}"]`);
    await this.click(`[data-date="${end}"]`);
  }
}
