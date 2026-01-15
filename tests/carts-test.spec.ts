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

  test("validate cart has items", async ({cartsPage}) => {
    await cartsPage.validateCartHasItems();
  });
});

