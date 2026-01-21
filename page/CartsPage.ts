import BasePage from "../base/Base";
import ProductsPage from "./ProductsPage";

export default class CartsPage extends BasePage {
  private cartItem = '[data-test="inventory-item"]';
  private cartBadge = ".shopping_cart_link";
  private continueShoppingBtn = "#continue-shopping";
  private checkOutBtn = "#checkout";
  private cancelCheckOutBtn = "#cancel";
  private continueCheckOutBtn = "#continue";
  private errorMsg =
    '//*[@id="checkout_info_container"]/div/form/div[1]/div[4]';
  private titleCheckOutInfo = ".title";

  private firstNameInput = "#first-name";
  private lastNameInput = "#last-name";
  private postalCodeInput = "#postal-code";

  private checkOutSucessTitle = ".title";

  private productsPage = new ProductsPage(this.page);

  private paymentInfoLabel = '[data-test="payment-info-label"]';
  private paymentInfoValue = '[data-test="payment-info-value"]';
  private shippingInfoLabel = '[data-test="shipping-info-label"]';
  private shippingInfoValue = '[data-test="shipping-info-value"]';
  private totalInfoLabel = '[data-test="total-info-label"]';
  private subTotalLabel = '[data-test="subtotal-label"]';
  private taxLabel = '[data-test="tax-label"]';
  private totalLabel = '[data-test="total-label"]';

  private finishButton = "#finish";

  private successImg = ".pony_express";
  private thankYouMsg = ".complete-header";
  private msgInfo = ".complete-text";
  private backToProducts = "#back-to-products";

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
    await this.toContainsTextInElement(
      this.titleCheckOutInfo,
      "Checkout: Your Information"
    );

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
    await this.toContainsTextInElement(
      this.titleCheckOutInfo,
      "Checkout: Your Information"
    );

    await this.expectVisible(this.cancelCheckOutBtn);
    await this.click(this.cancelCheckOutBtn);

    await this.containsLinkValue("cart.html");
    await this.waitForPageReady();
  }

  async proceedToCheckoutWithValidData(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    const customerData = [
      { selector: this.firstNameInput, value: firstName },
      { selector: this.lastNameInput, value: lastName },
      { selector: this.postalCodeInput, value: postalCode },
    ];
    await this.productsPage.addAllProductsToCart();
    await this.goToCart();
    await this.expectVisible(this.checkOutBtn);
    await this.click(this.checkOutBtn);
    await this.waitForPageReady();
    await this.containsLinkValue("checkout-step-one.html");

    await this.toBeVisibleElement(this.titleCheckOutInfo);
    await this.toContainsTextInElement(
      this.titleCheckOutInfo,
      "Checkout: Your Information"
    );

    for (const data of customerData) {
      await this.expectVisible(data.selector);
      await this.type(data.selector, data.value);
    }

    await this.expectVisible(this.continueCheckOutBtn);
    await this.click(this.continueCheckOutBtn);

    await this.toBeVisibleElement(await this.getByText("Checkout: Overview"));
    await this.toBeVisibleElement(await this.getByText("QTY"));
    await this.toBeVisibleElement(await this.getByText("Description"));

    await this.toBeGreaterThanValue(
      await (await this.getByLocator(this.cartItem)).count(),
      0
    );

    const viewport = this.page.viewportSize();
    const scrollCount = viewport && viewport.width <= 768 ? 2 : 1;

    for (let i = 0; i < scrollCount; i++) {
      await this.scrollPage("down", 1000);
    }

    await this.containsLinkValue("checkout-step-two.html");

    await this.toBeVisibleElement(this.paymentInfoLabel);
    await this.toContainsTextInElement(
      this.paymentInfoLabel,
      "Payment Information:"
    );
    await this.toBeVisibleElement(this.paymentInfoValue);
    await this.toContainsTextInElement(this.paymentInfoValue, /.+/);

    await this.toBeVisibleElement(this.shippingInfoLabel);
    await this.toContainsTextInElement(
      this.shippingInfoLabel,
      "Shipping Information:"
    );

    await this.toBeVisibleElement(this.shippingInfoValue);
    await this.toContainsTextInElement(this.shippingInfoValue, /\S/);

    await this.toBeVisibleElement(this.totalInfoLabel);
    await this.toContainsTextInElement(this.totalInfoLabel, "Price Total");

    await this.toBeVisibleElement(this.subTotalLabel);
    await this.toContainsTextInElement(
      this.subTotalLabel,
      /^Item total:\s*\$\d+\.\d{2}\s*$/
    );

    await this.toBeVisibleElement(this.taxLabel);
    await this.toContainsTextInElement(
      this.taxLabel,
      /Tax:\s*\$\d+\.\d{2}\s*$/
    );

    await this.toBeVisibleElement(this.totalLabel);
    await this.toContainsTextInElement(
      this.totalLabel,
      /Total:\s*\$\d+\.\d{2}\s*$/
    );

    await this.expectVisible(this.finishButton);
    await this.click(this.finishButton);

    await this.containsLinkValue("checkout-complete.html");

    await this.toBeVisibleElement(this.checkOutSucessTitle);
    await this.toContainsTextInElement(
      this.checkOutSucessTitle,
      "Checkout: Complete!"
    );

    await this.toBeVisibleElement(this.successImg);

    await this.toBeVisibleElement(this.thankYouMsg);
    await this.toContainsTextInElement(
      this.thankYouMsg,
      "Thank you for your order!"
    );

    await this.toBeVisibleElement(this.msgInfo);
    await this.toContainsTextInElement(
      this.msgInfo,
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );

    await this.expectVisible(this.backToProducts);
    await this.click(this.backToProducts);

    await this.waitForPageReady();
  }
}
