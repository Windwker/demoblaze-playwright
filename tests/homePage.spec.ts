import {expect, test} from "@playwright/test";
import {HomePage} from "../pages/HomePage";


test.describe('Home page test suite', () => {
    test('Homepage @smoke', async ({page}) => {
        await page.goto('/', {waitUntil: 'domcontentloaded'});
        const homePage = new HomePage(page);
        expect (await homePage.getCurrentUrl()).toContain('https://www.demoblaze.com/');
        expect (await homePage.getCurrentPageTitle()).toEqual('STORE');
    });
})



