import { BasePage } from './basePage';
import { amwoshLocators } from './amwoshLocators';

export class AmwoshAboutUsPage extends BasePage {

    async navigateToAmwoshAboutUs() {
        await this.navigateTo('https://amwosh-dev-org.pages.dev/about-us');
    }
    async verifyMissionAndVision() {
        await this.expectVisibleByLocator(amwoshLocators.aboutUsMission);
        await this.expectVisibleByLocator(amwoshLocators.aboutUsVision);
        await this.takeScreenshot('amwosh-about-us-mission-vision');
    }

    async verifyCoreValues() {
        await this.expectHeading('Our Core Values');
        // await this.expectVisibleByLocator(amwoshLocators.coreValueTitle);
        // await this.expectVisibleByLocator(amwoshLocators.coreValueFirst);
        // await this.expectVisibleByLocator(amwoshLocators.coreValueSecond);
        // await this.expectVisibleByLocator(amwoshLocators.coreValueThird);
        // await this.expectVisibleByLocator(amwoshLocators.coreValueFourth);
        await this.takeScreenshot('amwosh-about-us-core-values');
    }
}