import BasePage from "../base/Base";

export default class ProductsPage extends BasePage {
  private productDiv = 'xpath=//*[@id="inventory_container"]/div';

  private backPackAdd= '#add-to-cart-sauce-labs-backpack'
  private bikeLightAdd= '#add-to-cart-sauce-labs-bike-light'
  private boltTShirtAdd= '#add-to-cart-sauce-labs-bolt-t-shirt'
  private fleeceJacketAdd= '#add-to-cart-sauce-labs-fleece-jacket'
  private onesieAdd= '#add-to-cart-sauce-labs-onesie'
  private redTShirtAdd= '[id="add-to-cart-test.allthethings()-t-shirt-(red)"]';

  private backPackRemove= '#remove-sauce-labs-backpack'
  private bikeLightRemove= '#remove-sauce-labs-bike-light'
  private boltTShirtRemove= '#remove-sauce-labs-bolt-t-shirt'
  private fleeceJacketRemove= '#remove-sauce-labs-fleece-jacket'
  private onesieRemove= '#remove-sauce-labs-onesie'
  private redTShirtRemove= '[id="remove-test.allthethings()-t-shirt-(red)"]';


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
      this.bikeLightAdd,
      this.boltTShirtAdd,
      this.fleeceJacketAdd,
      this.onesieAdd,
      this.redTShirtAdd
    ];

    for(const button of addProductsButton) {

      if (button == this.onesieAdd){
        await this.scrollPage("down", 1000);
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
      this.redTShirtRemove
    ]
    await this.addAllProductsToCart();
    await this.scrollPage("up", 1000);

    for(const button of removeProductsButton) {

      if (button == this.onesieRemove){
        await this.scrollPage("down", 1000);
      }
      await this.waitForSelectorVisible(button);
      await this.click(button);
    }
  }
}
