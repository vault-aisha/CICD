import {test, expect} from '@playwright/test';
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

test('Basic Authh test', async ({ page, context }) => {

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












