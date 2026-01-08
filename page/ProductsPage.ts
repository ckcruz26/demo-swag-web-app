import BasePage from "../base/Base";

export default class ProductsPage extends BasePage {

  private productDiv = 'xpath=//*[@id="inventory_container"]/div'
  async listAllProducts() {
    const items = await this.page.$$(
      'xpath=//*[@id="inventory_container"]/div'
    );

    const products = this.page.locator('.inventory_item');


    for (let i = 0; i < await products.count(); i++) {
        const button = products.nth(i).locator('.button');
    
    await this.click(button)
}

  }

  async addProduct() {}

  async removeProduct() {}
}
