import BasePage from "../base/Base";
import ProductsPage from "./ProductsPage";

export default class CartsPage extends BasePage {
  private cartItem = '[data-test="inventory-item"]';
  private cartBadge = ".shopping_cart_link";
  private continueShoppingBtn = "#continue-shopping";
  private checkOutBtn = "#checkout";
  private cancelCheckOutBtn = '#cancel'
  private continueCheckOutBtn = "#continue";
  private errorMsg = '//*[@id="checkout_info_container"]/div/form/div[1]/div[4]';
  private titleCheckOutInfo = '.title'

  private firstNameInput = '#first-name'
  private lastNameInput = '#last-name'
  private postalCodeInput = '#postal-code'

  private productsPage = new ProductsPage(this.page);

  async goToCart() {
    await this.expectVisible(this.cartBadge);
    await this.click(this.cartBadge);
    await this.containsLinkValue("cart.html");
  }

  async validateCardtIsEmpty() {
    await this.goToCart();
    await this.toBeVisibleElement(await this.getByText("QTY"));
    await this.toBeVisibleElement(await this.getByText("Description"));
    await this.toHaveCount(this.cartItem, 0);
  }

  async redirectToProductsPage() {
    await this.goToCart();
    await this.expectVisible(this.continueShoppingBtn);
    await this.click(this.continueShoppingBtn);
    await this.containsLinkValue("inventory.html");
    await this.waitForPageReady();
  }

  async validateCartHasItems() {
    await this.productsPage.addAllProductsToCart();
    await this.goToCart();
    await this.toBeVisibleElement(await this.getByText("QTY"));
    await this.toBeVisibleElement(await this.getByText("Description"));
    await this.toBeGreaterThanValue(
      await (await this.getByLocator(this.cartItem)).count(),
      0
    );
  }

  async proceedCheckOutAndSkipRequiredFields() {

    await this.productsPage.addAllProductsToCart();
    await this.goToCart();
    await this.expectVisible(this.checkOutBtn);
    await this.click(this.checkOutBtn);

    await this.waitForPageReady();
    await this.containsLinkValue("checkout-step-one.html");

    await this.toBeVisibleElement(this.titleCheckOutInfo);
    await this.toContainsTextInElement(this.titleCheckOutInfo, "Checkout: Your Information");

    await this.expectVisible(this.continueCheckOutBtn);
    await this.click(this.continueCheckOutBtn);


    await this.toBeVisibleElement(this.errorMsg);
    await this.toContainsTextInElement(
      this.errorMsg,
      "Error: First Name is required"
    );
  }

  async cancelCheckoutAndReturnToCart() {

    await this.productsPage.addAllProductsToCart();
    await this.goToCart();
    await this.expectVisible(this.checkOutBtn);
    await this.click(this.checkOutBtn);
    await this.waitForPageReady();
    await this.containsLinkValue("checkout-step-one.html");

    await this.toBeVisibleElement(this.titleCheckOutInfo);
    await this.toContainsTextInElement(this.titleCheckOutInfo, "Checkout: Your Information");

    await this.expectVisible(this.cancelCheckOutBtn);
    await this.click(this.cancelCheckOutBtn);

    await this.containsLinkValue("cart.html");
    await this.waitForPageReady();

  }

  async proceedToCheckoutWithValidData(firstName: string, lastName: string, postalCode: string) {

    const customerData = [
        { selector: this.firstNameInput, value: firstName },
        { selector: this.lastNameInput, value: lastName },
        { selector: this.postalCodeInput, value: postalCode },
    ]
    await this.productsPage.addAllProductsToCart();
    await this.goToCart();
    await this.expectVisible(this.checkOutBtn);
    await this.click(this.checkOutBtn);
    await this.waitForPageReady();
    await this.containsLinkValue("checkout-step-one.html");

    await this.toBeVisibleElement(this.titleCheckOutInfo);
    await this.toContainsTextInElement(this.titleCheckOutInfo, "Checkout: Your Information");

    for(const data of customerData) {
        await this.expectVisible(data.selector);
        await this.type(data.selector, data.value);
    }
    
    await this.expectVisible(this.continueCheckOutBtn);
    await this.click(this.continueCheckOutBtn);
  }
}
