import { test as base } from "@playwright/test";
import LoginPage from "../page/LoginPage";
import ProductsPage from "../page/ProductsPage";

type Fixtures = {
  loginPage: LoginPage;
  productsPage : ProductsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  productsPage : async({page}, use) => {
    const productsPage = new ProductsPage(page)
    await use(productsPage)
  }
});

export { expect } from "@playwright/test";
