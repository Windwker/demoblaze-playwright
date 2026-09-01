import {expect, test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";
import {HeaderWidget} from "../pages/HeaderWidget";
import {FooterWidget} from "../pages/FooterWidget";
import {mockProductResponse} from "../mocks/productMocks";

let homePage: HomePage;
let headerWidget: HeaderWidget;
let footerWidget: FooterWidget;

test.beforeEach(async ({page}) => {
    headerWidget = new HeaderWidget(page);
    footerWidget = new FooterWidget(page);
    homePage = new HomePage(page);
    await homePage.goto();
})

test.describe('Home page test suite', () => {
    test.skip('Homepage @smoke', async () => {
        expect(await homePage.getCurrentUrl()).toContain('https://www.demoblaze.com/');
        expect(await homePage.getCurrentPageTitle()).toEqual('STORE');
    });

    test.skip('Home page should show all the expected elements', async () => {
        await expect(homePage.getNextButton()).toBeVisible();
        await expect(homePage.getPreviousButton()).toBeVisible();
        await expect(homePage.getCategoriesSection()).toBeVisible();
        await expect(homePage.getPhonesOption()).toBeVisible();
        await expect(homePage.getLaptopsOption()).toBeVisible();
        await expect(homePage.getMonitorsOption()).toBeVisible();
    })

    test.skip('Add a product to the cart, make sure the product is listed successfully', async () => {
        const productPage = await homePage.getProduct('Nexus 6');
        await productPage.addToCart();
        await headerWidget.goToHomePage();
        await homePage.getProduct('Samsung galaxy s6')
        await productPage.addToCart();
        const cartPage = await headerWidget.goToCartPage();
        await expect(cartPage.getCartProduct('Nexus 6')).toBeVisible({timeout: 10000});
        expect(await cartPage.getProductPrice('Nexus 6')).toEqual('650');
        await expect(cartPage.getCartProduct('Samsung galaxy s6')).toBeVisible({timeout: 10000});
        expect(await cartPage.getProductPrice('Samsung galaxy s6')).toEqual('360');
    })

    test.skip('Add a product to the cart, and place the order successfully', async () => {
        const productPage = await homePage.getProduct('Nexus 6');
        await productPage.addToCart();
        const cartPage = await headerWidget.goToCartPage();
        await cartPage.clickPlaceOrder();
        await cartPage.completeTheForm('Javier', 'Argentina', 'Cordoba', '2424242424242', '12', '2009');
        await cartPage.clickPurchaseButton();
        await expect(cartPage.getConfirmationAlert()).toBeVisible();
    })

    test.skip('Mock the response with different products, make sure all the product cards are displayed successfully', async ({page}) => {
        await page.route('https://api.demoblaze.com/entries', async route => {

            await route.fulfill({
                status:200,
                contentType: 'application/json',
                body: JSON.stringify(mockProductResponse)
            })
        })

        await page.reload();
        await expect(page.locator('#tbodyid .card-title')).toHaveText(['Samsung galaxy s6']);
    })
})
