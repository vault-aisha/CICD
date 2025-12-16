import {test, expect} from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Add/Remove Elements test', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
    await page.getByRole('link', { name: 'Add/Remove Elements' }).click();
    await expect(page.getByRole('heading', { name: 'Add/Remove Elements' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Element' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeHidden();
    await page.getByRole('button', { name: 'Add Element' }).click();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByRole('button', { name: 'Delete' })).toBeHidden();
});

test('Basic Auth test', async ({ page, context }) => {

    await context.setHTTPCredentials({
        username: 'admin',
        password: 'admin'
    });

    await page.goto('https://the-internet.herokuapp.com/basic_auth');

    await expect(page.locator('p')).toContainText('Congratulations! You must have the proper credentials.');
});

test('broken images test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/broken_images');

    const images = page.locator('img');
    const count = await images.count();
    console.log(`Total images found: ${count}`);

    for (let i = 0; i < count; i++) {
        const img = images.nth(i);

        await expect(img).toBeAttached();

        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);

        if (naturalWidth > 0) {
            console.log(`Image ${i + 1} loaded successfully.`);
        } else {
            console.warn(`Image ${i + 1} is broken.`);
        }
    }
});

test('Checkbox test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await expect(page.getByRole('heading', {name:'Checkboxes'})).toBeVisible();
    await expect(page.locator("(//input[@type='checkbox'])[2]")).toBeChecked();
    await page.locator("(//input[@type='checkbox'])[2]").uncheck();
    await page.locator("(//input[@type='checkbox'])[1]").check();
});

test ('Drag and Drop test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await expect(page.getByRole('heading',{name: 'Drag and Drop'})).toBeVisible();
    await page.locator("#column-a").dragTo(page.locator("#column-a"));
})

test('Dropdown test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await expect(page.getByRole('heading', { name: 'Dropdown List' })).toBeVisible();
    await page.locator("#dropdown").selectOption('1');
    await expect (page.locator("#dropdown")).toHaveValue('1');
})

test('Entry Ad test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/entry_ad');
    await expect(page.getByRole('heading', { name: 'Entry Ad' })).toBeVisible();
    await page.waitForSelector('#modal', {state: 'visible'});
    await expect(page.locator('.modal-title')).toBeVisible();
    await page.locator('.modal-footer > p').click();
    await expect(page.locator('.modal-title')).toBeHidden();
});

test('Exit Intent test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/exit_intent');
    await expect(page.getByRole('heading', { name: 'Exit Intent' })).toBeVisible();
    await page.mouse.move(-50,-50);
    await expect(page.locator('div.modal')).toBeVisible();
    await expect(page.locator('.modal-title')).toBeVisible();
    await page.locator('.modal-footer > p').click();
    await expect(page.locator('.modal-title')).toBeHidden();
});

test('File Download test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('a[href="download/arquivo.txt"]')
  ]);

  expect(download.suggestedFilename()).toBe('arquivo.txt');
  const downloadPath = path.join('C:\\Users\\Lenovo\\Downloads', 'arquivo.txt');
  await download.saveAs(downloadPath);
  expect(fs.existsSync(downloadPath)).toBe(true);
});

test('File Upload test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload');
    await expect(page.getByRole('heading', { name: 'File Uploader' })).toBeVisible();
    const filePath = path.resolve(__dirname, 'resources', 'arquivo.txt');
    await page.setInputFiles('input#file-upload', filePath);
    await page.locator('input#file-submit').click();
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toHaveText('arquivo.txt');
});

test('Floating Menu test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/floating_menu');

  const floatingMenu = page.locator('#menu');
  await expect(floatingMenu).toBeVisible();

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await expect(floatingMenu).toBeVisible();

  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  await expect(floatingMenu).toBeVisible();
});
test ('Form Authentication Positive test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
});

test ('Form Authentication Negative test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();  
    await page.locator('#username').fill('wronguser');
    await page.locator('#password').fill('wrongpassword');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
});

test('Horizontal Slider test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/horizontal_slider');
    await expect(page.getByRole('heading', { name: 'Horizontal Slider' })).toBeVisible();   
    const slider = page.locator('input[type="range"]');
    await slider.fill('4');
    await expect(page.locator('#range')).toHaveText('4');
});

test('Hover test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await expect(page.getByRole('heading', { name: 'Hovers' })).toBeVisible();   
    const user1 = page.locator('(//div[@class="figure"])[1]');
    await user1.hover();
    await expect(user1.locator('text=View profile')).toBeVisible();
});

test('Multiple Windows test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/windows');
    await expect(page.getByRole('heading', { name: 'Opening a new window' })).toBeVisible();    
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('a[href="/windows/new"]').click()
    ]);
    await expect(newPage.locator('h3')).toHaveText('New Window');
});

test('Redirect Link test', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/redirector');
    await expect(page.getByRole('heading', { name: 'Redirection' })).toBeVisible(); 
    await Promise.all([
        page.waitForNavigation(),
        page.locator('a#redirect').click()
    ]);
    await expect(page.locator('h3')).toHaveText('Status Codes');
});




