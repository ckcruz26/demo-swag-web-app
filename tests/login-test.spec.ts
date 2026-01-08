import { test } from "../fixtures/SwagFixtures";

test.describe("Login Suite", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open("https://www.saucedemo.com/");
  });

  test.afterEach(async ({ loginPage }) => {
    await loginPage.close();
  });

  test("TC-01 Invalid Credentials for Standard User", async ({loginPage}) => {
    await loginPage.login('standard_user','secret_sauce12312')
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service')
  })

  test("TC-05 Valid Credentials for Standard User", async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifyIfRedirectedToDashboard()
  });

});
