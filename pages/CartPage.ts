import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export class CartPage extends BasePage {
    private readonly productsList;
    private readonly placeOrder_btn;
    private readonly form_body;
    private readonly form_footer;
    private readonly formName_input;
    private readonly formCountry_input;
    private readonly formCity_input;
    private readonly formCC_input;
    private readonly formMonth_input;
    private readonly formYear_input;
    private readonly purchase_btn;
    private readonly confirmation_alert;

    constructor(page: Page) {
        super(page);
        this.productsList = page.locator('#tbodyid');
        this.placeOrder_btn = page.locator('[data-target="#orderModal"]');
        this.form_body = page.locator('.modal-body');
        this.form_footer = page.locator('.modal-footer');
        this.formName_input = this.form_body.locator('#name');
        this.formCountry_input = this.form_body.getByLabel('Country:');
        this.formCity_input = this.form_body.getByLabel('City:');
        this.formCC_input = this.form_body.getByLabel('Credit card:');
        this.formMonth_input = this.form_body.getByLabel('Month:');
        this.formYear_input = this.form_body.getByLabel('Year:');
        this.purchase_btn = this.form_footer.getByRole('button', {name: 'Purchase'});
        this.confirmation_alert = page.locator('.sweet-alert');
    }

    getCartProduct(productName: string): Locator {
        return this.productsList.getByText(productName);
    }

    async getProductPrice(productName: string) {
        return await this.productsList.getByText(productName).locator('..').locator('td').nth(2).textContent();
    }

    async clickPlaceOrder() {
        await this.placeOrder_btn.click();
    }

    async completeTheForm(name: string, country: string, city: string, creditCard: string, month: string, year: string) {
        await this.completeName(name);
        await this.completeCountry(country);
        await this.completeCity(city);
        await this.completeCreditCard(creditCard);
        await this.completeMonth(month);
        await this.completeYear(year);
    }

    async completeName(name: string) {
        await this.formName_input.fill(name);
    }

    async completeCountry(country: string) {
        await this.formCountry_input.fill(country);
    }

    async completeCity(city: string) {
        await this.formCity_input.fill(city);
    }

    async completeCreditCard(creditCardNumber: string) {
        await this.formCC_input.fill(creditCardNumber);
    }

    async completeMonth(month: string) {
        await this.formMonth_input.fill(month);
    }

    async completeYear(year: string) {
        await this.formYear_input.fill(year);
    }

    async clickPurchaseButton() {
        await this.purchase_btn.click();
    }

    getConfirmationAlert(): Locator {
        return this.confirmation_alert;
    }
}