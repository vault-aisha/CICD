import { BasePage } from './basePage';
import { amwoshLocators } from './amwoshLocators';

export class AmwoshPage extends BasePage {
  async openAmwosh() {
    await this.navigateTo('https://amwosh-dev-org.pages.dev/');
  }

  async navigatePages(linkName: string) {
    await this.clickByRole('link', linkName);
  }

  async verifyMissionSection() {
    await this.expectVisibleByLocator(amwoshLocators.missionFirstCard);
    await this.expectVisibleByLocator(amwoshLocators.missionSecondCard);
    await this.expectVisibleByLocator(amwoshLocators.missionThirdCard);
  }
}
