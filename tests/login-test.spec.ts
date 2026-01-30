import { test } from "../fixtures/SwagFixtures";

test.describe("Login Suite", () => {
  
   test.use({
    storageState: undefined,
  });
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open(String(process.env.WEB_URL));
  });

  test.afterEach(async ({ loginPage }) => {
    await loginPage.close();
  });

  test("TC-01 Invalid Credentials for Standard User", async ({loginPage}) => {
    await loginPage.login(String(process.env.STANDARD_USER), String(process.env.INVALID_PASSWORD))
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service')
    await loginPage.verifyIfNotRedirectedToDashboard()
  })

  test('TC-02 Locked Out Credentials', async ({loginPage}) => {
    await loginPage.login(String(process.env.LOCKED_OUT_USERNAME),String(process.env.PASSWORD))
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.')
    await loginPage.verifyIfNotRedirectedToDashboard()
  })

  test("TC-03 Valid Credentials for Standard User", async ({ loginPage }) => {
    await loginPage.login(String(process.env.STANDARD_USER), String(process.env.PASSWORD));
    await loginPage.verifyIfRedirectedToDashboard()
    await loginPage.logoutUser()
  });

});
