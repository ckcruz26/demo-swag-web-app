import { test as base } from "@playwright/test";
import LoginPage from "../page/LoginPage";
import ProductsPage from "../page/ProductsPage";
import CartsPage from "../page/CartsPage";
import NavigationBar from "../components/NavigationBar";

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartsPage: CartsPage;
  navBar: NavigationBar;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  cartsPage: async ({ page }, use) => {
    const cartsPage = new CartsPage(page);
    await use(cartsPage);
  },

  navBar: async ({ page }, use) => {
    const navBar = new NavigationBar(page);
    await use(navBar);
  },
});

export { expect } from "@playwright/test";
