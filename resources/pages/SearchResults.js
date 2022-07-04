const { expect } = require('@playwright/test');

exports.SearchResults = class SearchResults {
  /**
   * @param {import('playwright').Page} page 
   */
  constructor(page) {
    this.page = page;
    this.firstResult = page.locator('(//div[@class="s-item__image"])[2]');
    this.addToCartButton = page.locator('//a[@id="isCartBtn_btn"]');
    this.noThanksButton = page.locator('//button[normalize-space()="No thanks"]')
    this.itemTitleSearch = page.locator('(//h3[@class="s-item__title"])[2]')
    this.itemTitleCart = page.locator('//span[@class="BOLD"]')
  }

  async getFirstResult() {
    await this.firstResult.waitFor();
    const itemNameSearch = await this.itemTitleSearch.innerText()
    return itemNameSearch;
  }

  async clickFirstResult() {
    await this.firstResult.waitFor();
    await this.firstResult.click();
  }

  async addItemToCart() {
    await this.addToCartButton.waitFor();
    await this.addToCartButton.click();
    await this.noThanksButton.waitFor();
    await this.noThanksButton.click();
  }

  async verifyItemIsInCart(itemNameSearch) {
    await this.itemTitleCart.waitFor()
    const itemNameCart = await this.itemTitleCart.innerText()
    expect(itemNameCart).toBe(itemNameSearch)
  }
}