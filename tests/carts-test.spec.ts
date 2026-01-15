import path from "path";
import { test } from "../fixtures/SwagFixtures";

test.describe("Products Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/authentication.json"),
  });

  test.beforeEach(async ({ cartsPage }) => {
    await cartsPage.open("https://www.saucedemo.com/inventory.html");
    
  });

  test.afterEach(async ({ cartsPage }) => {
    await cartsPage.close();
  });

  test('validate cart is empty' , async ({cartsPage}) => {
    await cartsPage.validateCardtIsEmpty()
  })
  test("remove all products to cart", async ({ productsPage }) => {
    await productsPage.removeProduct();
  });

  test("add all products to cart", async ({cartsPage}) => {
    await cartsPage.validateCartHasItems();
    
  });
});

