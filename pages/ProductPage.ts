import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";
import {CartPage} from "./CartPage";

export class ProductPage extends BasePage {
    private readonly add_to_cart_btn: Locator

    constructor(page: Page) {
        super(page);
        this.add_to_cart_btn = page.locator('.btn-success');
    }


    async addToCart(): Promise<CartPage> {
        await this.add_to_cart_btn.waitFor({state: 'visible', timeout: 5000});
        const dialogHandled = this.page.waitForEvent('dialog').then(dialog => dialog.accept());
        await this.add_to_cart_btn.click();
        await dialogHandled;
        return new CartPage(this.page);
    }
}