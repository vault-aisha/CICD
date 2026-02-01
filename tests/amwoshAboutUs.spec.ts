import{ test} from '@playwright/test';
import { AmwoshAboutUsPage} from '../pages/amwoshAboutUs';
import { amwoshLocators } from '../pages/amwoshLocators';

test ('Navigate to About Us', async({page})=>{
    const amwosh = new AmwoshAboutUsPage(page);
    await amwosh.navigateTo('https://amwosh-dev-org.pages.dev/about-us');
    await amwosh.expectVisibleByLocator(amwoshLocators.aboutUsOurStory);
    await amwosh.takeScreenshot('amwosh-about-us');
});

test ('Verify About Us Mission and Vision', async({page})=>{
    const amwosh = new AmwoshAboutUsPage(page);
    await amwosh.navigateTo('https://amwosh-dev-org.pages.dev/about-us');
    await amwosh.verifyMissionAndVision();
});

test ('Verify Our Core Values', async({page})=>{
    const amwosh = new AmwoshAboutUsPage(page);
    await amwosh.navigateTo('https://amwosh-dev-org.pages.dev/about-us');
    await amwosh.verifyCoreValues();
});