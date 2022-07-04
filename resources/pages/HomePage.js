const { expect } = require('@playwright/test');


exports.HomePage = class HomePage {
  /**
   * @param {import('playwright').Page} page 
   */
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('//input[@placeholder="Search for anything"]');
    this.searchButton = page.locator('//input[@value="Search"]');
    this.myEbaySummary = page.locator('//a[normalize-space()="My eBay"]');
    this.signInContinue = page.locator('//button[@id="signin-continue-btn"]');
    this.signInErrorMessage = page.locator('//p[@id="signin-error-msg"]')
  }
  async navigate() {
    await this.page.goto('https://ebay.com.au');
  }
  async searchFor(text) {
    await this.searchInput.waitFor();
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }

  async signInWithBlankCredentials() {
    await this.myEbaySummary.waitFor()
    await this.myEbaySummary.click()
    await this.signInContinue.waitFor()
    await this.signInContinue.click()
  }

  async verifySignInErrorMessage() {
    await this.signInErrorMessage.waitFor()
    await expect(this.signInErrorMessage).toBeTruthy()
  }
}
