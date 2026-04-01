import BasePage from "../base/Base";

type MenuKey = "AllItems" | "About" | "Logout" | "Reset";

export default class NavigationBar extends BasePage {
  private hamburgerMenu = "#react-burger-menu-btn";

  private menuItems: Record<MenuKey, { locator: string; text: string }> = {
    AllItems: { locator: "#inventory_sidebar_link", text: "All Items" },
    About: { locator: "#about_sidebar_link", text: "Abxout" },
    Logout: { locator: '[data-test="logout-sidebar-link"]', text: "Logout" },
    Reset: { locator: "#reset_sidebar_link", text: "Reset App State" },
  };

  async openMenu() {
    await this.expectVisible(this.hamburgerMenu);
    await this.click(this.hamburgerMenu);
  }

  async navigate(menu: MenuKey) {
    await this.openMenu();
    await this.expectVisible(this.menuItems[menu].locator);
    await this.click(this.menuItems[menu].locator);
  }

  async validateTheMenuItems() {
    for (const { locator, text } of Object.values(this.menuItems)) {
      await this.waitForTimeoutElement(5000); // Ensure the menu is fully rendered
      await this.expectVisible(locator);
      await this.toContainsTextInElement(locator, text);
    }
  }
}