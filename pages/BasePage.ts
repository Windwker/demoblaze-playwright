import {Locator, Page} from "@playwright/test";
import {HomePage} from "./HomePage";

export class BasePage {
    private readonly home_btn: Locator;
    private readonly contact_btn: Locator;
    private readonly about_us_btn: Locator;
    private readonly cart_btn: Locator;
    private readonly login_btn: Locator;
    private readonly sign_up_btn: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.home_btn = page.getByText('Home');
        this.contact_btn = page.getByText('Contact');
        this.about_us_btn = page.getByText('About Us');
        this.cart_btn = page.getByText('Cart');
        this.login_btn = page.getByText('Log in');
        this.sign_up_btn = page.getByText('Sign up');

    }

    async goToHomePage(): Promise<HomePage> {
        await this.home_btn.click();
        return new HomePage(this.page);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async getCurrentPageTitle(): Promise<string> {
        return this.page.title();
    }
}