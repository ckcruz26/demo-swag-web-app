import BasePage from "../base/Base";

export default class ProductsPage extends BasePage {
  private productDiv = 'xpath=//*[@id="inventory_container"]/div';

  private backPackAdd= '#add-to-cart-sauce-labs-backpack'
  private bikeLightAdd= '#add-to-cart-sauce-labs-bike-light'
  private boltTShirtAdd= '#add-to-cart-sauce-labs-bolt-t-shirt'
  private fleeceJacketAdd= '#add-to-cart-sauce-labs-fleece-jacket'
  private onesieAdd= '#add-to-cart-sauce-labs-onesie'
  private redTShirtAdd= '#add-to-cart-test.allthethings()-t-shirt-(red)'


  async listAllProducts() {
    const items = await this.page.$$(
      'xpath=//*[@id="inventory_container"]/div'
    );

    const products = this.page.locator(".inventory_item");

    for (let i = 0; i < (await products.count()); i++) {
      console.log(await products.nth(i).allTextContents());
    }
  }

  async addAllProductsToCart() {
    const addProductsButton = [
      this.backPackAdd,
      // this.bikeLightAdd,
      // this.boltTShirtAdd,
      // this.fleeceJacketAdd,
      // this.onesieAdd,
      // this.redTShirtAdd
    ];

    for(const button of addProductsButton) {
      await this.expectVisible(button);
      await this.click(button);
    }

  }

  async removeProduct() {}
}
