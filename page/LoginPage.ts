import BasePage from "../base/Base";


export default class LoginPage extends BasePage {
  private username = '#user-name';
  private password = '#password';
  private loginBtn = '#login-button';
  private errorMsg = '//*[@id="login_button_container"]/div/form/div[3]/h3'

  async login(username: string, password: string) {
    await this.type(this.username, username);
    await this.type(this.password, password);
    await this.click(this.loginBtn);
    await this.waitForPageReady();
  }

  async verifyIfRedirectedToDashboard() {
    await this.containsTitle('Swag Labs')
    await this.containsLinkValue('inventory.html')
  }

  async verifyErrorMessage(errMsgVal : string) {
    await this.expectVisible(this.errorMsg)
    await this.toContainsTextInElement(this.errorMsg,errMsgVal)
  }

  async verifyIfNotRedirectedToDashboard() {
    await this.notContainsLinkValue('inventory.html')
  }

}
