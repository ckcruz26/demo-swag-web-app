import path from "path";
import { test } from "../fixtures/SwagFixtures";

test.describe("Products Suite", () => {
 
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open(String(process.env.WEB_URL + "inventory.html"));
  });

  test.afterEach(async ({ productsPage }) => {
    await productsPage.close();
  });

  test('TC-01 view products list' , async ({productsPage}) => {
    await productsPage.filterProducts()
  })
  test("TC-02 remove all products to cart", async ({ productsPage }) => {
    await productsPage.removeProduct();
  });

  test("TC-03 add all products to cart", async ({ productsPage }) => {
    await productsPage.addAllProductsToCart();
  });
});

