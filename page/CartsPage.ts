import BasePage from "../base/Base";
import ProductsPage from "./ProductsPage";

export default class CartsPage extends BasePage {
  private cartItem = '[data-test="inventory-item"]';
  private cartBadge = ".shopping_cart_container";

  async goToCart() {
    await this.expectVisible(this.cartBadge);
    await this.click(this.cartBadge);
  }

  async validateCardtIsEmpty() {
    await this.toBeVisibleElement(await this.getByText("QTY"));
    await this.toBeVisibleElement(await this.getByText("Description"));
    await this.toHaveCount(this.cartItem, 0);
  }

  async validateCartHasItems() {
    const productsPage = new ProductsPage(this.page);

    await productsPage.addAllProductsToCart();
    await this.goToCart()
    await this.toBeVisibleElement(await this.getByText("QTY"));
    await this.toBeVisibleElement(await this.getByText("Description"));
    await this.toBeGreaterThanValue(
      await (await this.getByLocator(this.cartItem)).count(),
      0
    );
  }
}
