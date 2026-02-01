import { test } from '@playwright/test';
import { TheInternetPage } from '../pages/the-internet';
import path from 'path';
import fs from 'fs';

test.describe('The Internet Home Page', () => {
  let internet: TheInternetPage;
 
  test.beforeEach(async ({ page }) => {
    internet = new TheInternetPage(page);
    await internet.openHome();
  });
});

test('Add/Remove Elements test - Open by link', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.openHome();
  await internet.openByLink('Add/Remove Elements');
  await internet.expectHeading('Add/Remove Elements');
});

test('Basic Auth test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.basicAuth('admin', 'admin');
});

test('Broken Images test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.checkBrokenImages();
});

test('Checkbox test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.toggleCheckboxes();
});

test('Drag and Drop test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.dragAndDrop();
});

test('Dropdown test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.selectDropdown('1');
});

test('Entry Ad test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.closeEntryAd();
});

test('Exit Intent test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.triggerExitIntent();
});

test('File Download test', async ({ page }) => {
  const internet = new TheInternetPage(page);

  const fileName = 'arquivo.txt';
  const saveFolder = 'C:\\Users\\Lenovo\\Downloads';
  const fullPath = path.join(saveFolder, fileName);
  fs.mkdirSync(saveFolder, { recursive: true });
  await internet.downloadFile(fileName, saveFolder);
  console.log(fs.existsSync(fullPath) ? 'File downloaded!' : 'Download failed!');
});

test('File Upload test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.uploadFile('arquivo.txt');
});

test('Floating Menu test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.floatingMenuScroll();
});

test('Form Authentication Positive test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.login('tomsmith', 'SuperSecretPassword!');
  await internet.expectLoginSuccess();
});

test('Form Authentication Negative test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.login('wronguser', 'wrongpassword');
  await internet.expectLoginError();
});

test('Horizontal Slider test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.setSlider('4');
});

test('Hover test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.hoverUser(1);
});

test('Multiple Windows test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.openNewWindow();
});

test('Redirect Link test', async ({ page }) => {
  const internet = new TheInternetPage(page);
  await internet.redirectToStatus();
});
