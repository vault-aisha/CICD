import { Page, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async expectUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  async clickByRole(
    role: 'button' | 'link' | 'heading' | 'textbox',
    name: string
  ) {
    await this.page.getByRole(role, { name }).click();
  }

  async expectVisibleByRole(
    role: 'button' | 'link' | 'heading' | 'textbox',
    name: string
  ) {
    await expect(
      this.page.getByRole(role, { name })
    ).toBeVisible();
  }

  async expectVisibleByLocator(locator: string) {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async expectHeading(text: string) {
    await expect(
      this.page.getByRole('heading', { name: text })
    ).toBeVisible();
  }
}
