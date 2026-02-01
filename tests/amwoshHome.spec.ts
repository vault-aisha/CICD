import {test} from '@playwright/test';
import { AmwoshPage } from '../pages/amwoshHome';
import { amwoshLocators } from '../pages/amwoshLocators';
import path from 'path';
import fs from 'fs';

test.describe('AMWOSH Home Page', () => {
  let amwosh: AmwoshPage;
 
  test.beforeEach(async ({ page }) => {
    amwosh = new AmwoshPage(page);
    await amwosh.openAmwosh();
  });

test('Navigate to Amwosh Home and verify heading', async () => {
    await amwosh.expectHeading(amwoshLocators.homeTitle);
    await amwosh.takeScreenshot('amwosh-home');
}); 

test('Verify Amwosh Home Banner', async()=>{
    await amwosh.expectHeading(amwoshLocators.homeTitle);
    await amwosh.expectVisibleByLocator(amwoshLocators.homeBanner);
    await amwosh.expectVisibleByLocator(amwoshLocators.learnMoreButton);
    await amwosh.takeScreenshot('amwosh-banner');

});

test('Verify Amwosh Home Mission', async()=>{
    await amwosh.verifyMissionSection();
    await amwosh.takeScreenshot('amwosh-mission');
});
});
