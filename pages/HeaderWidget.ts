import {Locator, Page} from "@playwright/test";
import {HomePage} from "./HomePage";
import {CartPage} from "./CartPage";
import {BaseWidget} from "./BaseWidget";


export class HeaderWidget extends BaseWidget {
    private readonly home_btn: Locator;
    private readonly contact_btn: Locator;
    private readonly about_us_btn: Locator;
    private readonly cart_btn: Locator;
    private readonly login_btn: Locator;
    private readonly sign_up_btn: Locator;
    //
    //
    constructor(page: Page) {
        super(page);
        this.home_btn = page.getByText('Home');
        this.contact_btn = page.getByText('Contact');
        this.about_us_btn = page.getByText('About Us');
        this.cart_btn = page.getByRole('link', {name: 'Cart', exact: true})
        this.login_btn = page.getByText('Log in');
        this.sign_up_btn = page.getByText('Sign up');

    }


    async goToHomePage(): Promise<HomePage> {
        await this.home_btn.click();
        return new HomePage(this.page);
    }

    async goToCartPage(): Promise<CartPage> {
        await this.cart_btn.click();
        return new CartPage(this.page);
    }
}