import path from "path";
import { test } from "../fixtures/SwagFixtures";

test.describe("Products Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/authentication.json"),
  });

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open("https://www.saucedemo.com/inventory.html");
  });

  test.afterEach(async ({ productsPage }) => {
    await productsPage.close();
  });

  test('view products list' , async ({productsPage}) => {
    await productsPage.listAllProducts()
  })
});
