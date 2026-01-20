import path from "path";
import { test } from "../fixtures/SwagFixtures";
import { getFaker } from "../utils/FakerExt";

test.describe("Carts suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/authentication.json"),
  });

  
  test.beforeEach(async ({ cartsPage }) => {
    await cartsPage.open("https://www.saucedemo.com/inventory.html");
    
  });

  test.afterEach(async ({ cartsPage }) => {
    await cartsPage.close();
  });

  test("TC-01 validate cart is empty", async ({ cartsPage }) => {
    await cartsPage.validateCardtIsEmpty();
  });

  test("TC-02 validate cart has items", async ({ cartsPage }) => {
    await cartsPage.validateCartHasItems();
  });

  test("TC-03 proceed to checkout skipping required fields", async ({
    cartsPage,
  }) => {
    await cartsPage.proceedCheckOutAndSkipRequiredFields();
  });

  test("TC-04 cancel checkout and return to cart", async ({ cartsPage }) => {
    await cartsPage.cancelCheckoutAndReturnToCart();
  });

  test("TC-05 proceed to checkout with valid data", async ({ cartsPage }) => {
    const faker = await getFaker();
    await cartsPage.proceedToCheckoutWithValidData(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode());
  });
});
