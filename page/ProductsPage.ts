import BasePage from "../base/Base";

export default class ProductsPage extends BasePage {
  private productDivSub = '[data-test="inventory-item"]';

  private backPackAdd = "#add-to-cart-sauce-labs-backpack";
  private bikeLightAdd = "#add-to-cart-sauce-labs-bike-light";
  private boltTShirtAdd = "#add-to-cart-sauce-labs-bolt-t-shirt";
  private fleeceJacketAdd = "#add-to-cart-sauce-labs-fleece-jacket";
  private onesieAdd = "#add-to-cart-sauce-labs-onesie";
  private redTShirtAdd = '[id="add-to-cart-test.allthethings()-t-shirt-(red)"]';

  private backPackRemove = "#remove-sauce-labs-backpack";
  private bikeLightRemove = "#remove-sauce-labs-bike-light";
  private boltTShirtRemove = "#remove-sauce-labs-bolt-t-shirt";
  private fleeceJacketRemove = "#remove-sauce-labs-fleece-jacket";
  private onesieRemove = "#remove-sauce-labs-onesie";
  private redTShirtRemove = '[id="remove-test.allthethings()-t-shirt-(red)"]';

  private productFilterDropdown =
    'xpath=//*[@id="header_container"]/div[2]/div/span/select';

  async listAllProducts() {
    const products = await this.getByLocator(this.productDivSub);
    const prodCount = await products.count();

    await this.toBeGreaterThanValue(prodCount, 0);

    for (let i = 0; i < prodCount; i++) {
      const productVal = await products.nth(i);
      await this.toContainsTextInElement(
        productVal.locator(".inventory_item_name"),
        /.+/
      );
      await this.toContainsTextInElement(
        productVal.locator('[data-test="inventory-item-desc"]'),
        /.+/
      );
      await this.toContainsTextInElement(
        productVal.locator('[data-test="inventory-item-price"]'),
        /\$\d+\.\d{2}/
      );
      await this.toHaveCountInElement(productVal.locator("button"), 1);
      await this.toHaveAttributeInElement(
        productVal.locator("img"),
        "alt",
        /.+/
      );
    }
  }

  async filterProducts() {
    const filtersVal = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];
    for (const filter of filtersVal) {
      await this.selectFromDropdown(this.productFilterDropdown, filter);
      await this.waitForTimeoutElement(2000);
    }
  }

  async addAllProductsToCart() {
    const addProductsButton = [
      this.backPackAdd,
      this.bikeLightAdd,
      this.boltTShirtAdd,
      this.fleeceJacketAdd,
      this.onesieAdd,
      this.redTShirtAdd,
    ];

    for (const button of addProductsButton) {
      if (button == this.onesieAdd) {
        const viewport = this.page.viewportSize();
        const scrollCount = viewport && viewport.width <= 768 ? 2 : 1;

        for (let i = 0; i < scrollCount; i++) {
          await this.scrollPage("down", 1000);
        }
      }
      await this.waitForSelectorVisible(button);
      await this.click(button);
    }
  }

  async removeProduct() {
    const removeProductsButton = [
      this.backPackRemove,
      this.bikeLightRemove,
      this.boltTShirtRemove,
      this.fleeceJacketRemove,
      this.onesieRemove,
      this.redTShirtRemove,
    ];
    await this.addAllProductsToCart();
    const viewport = this.page.viewportSize();
    const scrollCount = viewport && viewport.width <= 768 ? 2 : 1;

    for (let i = 0; i < scrollCount; i++) {
      await this.scrollPage("up", 1000);
    }

    for (const button of removeProductsButton) {
      if (button == this.onesieRemove) {
        const viewport = this.page.viewportSize();
        const scrollCount = viewport && viewport.width <= 768 ? 2 : 1;

        for (let i = 0; i < scrollCount; i++) {
          await this.scrollPage("down", 1000);
        }
      }
      await this.waitForSelectorVisible(button);
      await this.click(button);
    }
  }
}
