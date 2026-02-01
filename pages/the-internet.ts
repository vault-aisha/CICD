import { Page, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { BasePage } from './basePage';

export class TheInternetPage extends BasePage {

  // 1. Home
  async openHome() {
    await this.page.goto('https://the-internet.herokuapp.com/');
  }

  async openByLink(linkName: string) {
    await this.page.getByRole('link', { name: linkName }).click();
  }

  async expectHeading(text: string) {
    await expect(this.page.getByRole('heading', { name: text })).toBeVisible();
  }

  // 2. Basic Auth
  async basicAuth(username: string, password: string) {
    await this.page.context().setHTTPCredentials({ username, password });
    await this.page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(this.page.locator('p')).toContainText(
      'Congratulations! You must have the proper credentials.'
    );
  }

  // 3. Broken Images
  async checkBrokenImages() {
    await this.page.goto('https://the-internet.herokuapp.com/broken_images');
    const images = this.page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeAttached();
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      if (naturalWidth > 0) console.log(`Image ${i + 1} loaded successfully.`);
      else console.warn(`Image ${i + 1} is broken.`);
    }
  }

  // 4. Checkbox
  async toggleCheckboxes() {
    await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
    await expect(this.page.locator("(//input[@type='checkbox'])[2]")).toBeChecked();
    await this.page.locator("(//input[@type='checkbox'])[2]").uncheck();
    await this.page.locator("(//input[@type='checkbox'])[1]").check();
  }

  // 5. Drag and Drop
  async dragAndDrop() {
    await this.page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await this.page.locator("#column-a").dragTo(this.page.locator("#column-a"));
  }

  // 6. Dropdown
  async selectDropdown(option: string) {
    await this.page.goto('https://the-internet.herokuapp.com/dropdown');
    await this.page.locator("#dropdown").selectOption(option);
    await expect(this.page.locator("#dropdown")).toHaveValue(option);
  }

  // 7. Entry Ad
  async closeEntryAd() {
    await this.page.goto('https://the-internet.herokuapp.com/entry_ad');
    await this.page.waitForSelector('#modal', { state: 'visible' });
    await this.page.locator('.modal-footer > p').click();
    await expect(this.page.locator('.modal-title')).toBeHidden();
  }

  // 8. Exit Intent
  async triggerExitIntent() {
    await this.page.goto('https://the-internet.herokuapp.com/exit_intent'); 
    await expect(this.page.getByRole('heading', { name: 'Exit Intent' })).toBeVisible(); 
    await this.page.mouse.move(-50,-50); 
    await expect(this.page.locator('div.modal')).toBeVisible(); 
    await expect(this.page.locator('.modal-title')).toBeVisible(); 
    await this.page.locator('.modal-footer > p').click(); 
    await expect(this.page.locator('.modal-title')).toBeHidden();
  }
  // 9. File Download
  async downloadFile(fileName: string, saveFolder: string) {
  await this.page.goto('https://the-internet.herokuapp.com/download');

  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.page.click(`a[href="download/${fileName}"]`)
  ]);

  expect(download.suggestedFilename()).toBe(fileName);

  // Ensure folder exists
  if (!fs.existsSync(saveFolder)) {
    fs.mkdirSync(saveFolder, { recursive: true });
  }

  const fullPath = path.join(saveFolder, fileName);
  await download.saveAs(fullPath);

  expect(fs.existsSync(fullPath)).toBe(true);
  }

  // 10. File Upload
  async uploadFile(fileName: string) {
    await this.page.goto('https://the-internet.herokuapp.com/upload');

  // Use absolute path to the file in your tests/resources folder
    const filePath = path.resolve('tests', 'resources', fileName);

    await this.page.setInputFiles('input#file-upload', filePath);
    await this.page.locator('input#file-submit').click();
    await expect(this.page.locator('h3')).toHaveText('File Uploaded!');
    await expect(this.page.locator('#uploaded-files')).toHaveText(fileName);
  }

  // 11. Floating Menu
  async floatingMenuScroll() {
    await this.page.goto('https://the-internet.herokuapp.com/floating_menu');
    const floatingMenu = this.page.locator('#menu');
    await expect(floatingMenu).toBeVisible();
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(floatingMenu).toBeVisible();
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await expect(floatingMenu).toBeVisible();
  }

  // 12 & 13. Form Authentication Positive & Negative
  async login(username: string, password: string) {
    await this.page.goto('https://the-internet.herokuapp.com/login');
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('button[type="submit"]').click();
  }

  async expectLoginSuccess() {
    await expect(this.page.locator('.flash.success')).toContainText(
      'You logged into a secure area!'
    );
  }

  async expectLoginError() {
    await expect(this.page.locator('.flash.error')).toContainText(
      'Your username is invalid!'
    );
  }

  // 14. Horizontal Slider
  async setSlider(value: string) {
    await this.page.goto('https://the-internet.herokuapp.com/horizontal_slider');
    const slider = this.page.locator('input[type="range"]');
    await slider.fill(value);
    await expect(this.page.locator('#range')).toHaveText(value);
  }

  // 15. Hover
  async hoverUser(index: number) {
    await this.page.goto('https://the-internet.herokuapp.com/hovers');
    const user = this.page.locator(`(//div[@class="figure"])[${index}]`);
    await user.hover();
    await expect(user.locator('text=View profile')).toBeVisible();
  }

  // 16. Multiple Windows
  async openNewWindow() {
    await this.page.goto('https://the-internet.herokuapp.com/windows');
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('a[href="/windows/new"]').click()
    ]);
    return newPage;
  }

  // 17. Redirect Link
  async redirectToStatus() {
    await this.page.goto('https://the-internet.herokuapp.com/redirector');
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.locator('a#redirect').click()
    ]);
  }
}
