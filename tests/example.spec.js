// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const { HomePage } = require('../resources/pages/HomePage');
const { SearchResults } = require('../resources/pages/SearchResults');

test.describe('Test scenarios for Sonar technical assesment', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigate()
  });


  test('Verify item added to cart is displayed in the cart', async ({ page }) => {
    const homePage = new HomePage(page)
    let searchResults = new SearchResults(page)
    await homePage.searchFor('bike')
    const itemNameSearch = await searchResults.getFirstResult()
    const [page2] = await Promise.all([
      page.waitForEvent('popup'),
      await searchResults.clickFirstResult()
    ]);
    searchResults = new SearchResults(page2)
    await searchResults.addItemToCart()
    await searchResults.verifyItemIsInCart(itemNameSearch)

  })

  test('Verify error messages when logging in without username or password', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.signInWithBlankCredentials()
    await homePage.verifySignInErrorMessage()
  })
})
