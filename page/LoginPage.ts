import { Page } from "@playwright/test";
import BasePage from "../base/Base";
import NavigationBar from "../components/NavigationBar";

export default class LoginPage extends BasePage {
  private nav: NavigationBar;
  private username = '#user-name';
  private password = '#password';
  private loginBtn = '#login-button';
  private errorMsg = '#login_button_container h3'; // improved selector

  constructor(page : Page) {
    super(page);
    this.nav = new NavigationBar(page);
  }

  async login(username: string, password: string) {
    await this.type(this.username, username);
    await this.type(this.password, password);
    await this.click(this.loginBtn);
    await this.waitForPageReady();
  }

  async verifyIfRedirectedToDashboard() {
    await this.containsTitle('Swag Labs');
    await this.containsLinkValue('inventory.html');
  }

  async verifyErrorMessage(errMsgVal: string) {
    await this.expectVisible(this.errorMsg);
    await this.toContainsTextInElement(this.errorMsg, errMsgVal);
  }

  async verifyIfNotRedirectedToDashboard() {
    await this.notContainsLinkValue('inventory.html');
  }

  async logoutUser() {
    await this.nav.navigate('Logout');
  }
}