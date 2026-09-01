import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export class CartPage extends BasePage {
    private readonly productsList;

    constructor(page: Page) {
        super(page);
        this.productsList = page.locator('#tbodyid');
    }

    getCartProduct(productName: string): Locator {
        return this.productsList.getByText(productName);
    }

    async getProductPrice(productName: string) {
        const text = await this.productsList.getByText(productName).locator('..').locator('td').nth(2).textContent()
        return text;
    }
}