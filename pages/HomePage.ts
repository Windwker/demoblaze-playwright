import {BasePage} from "./BasePage";
import {BrowserContext, Locator, Page} from "@playwright/test";
import {ProductPage} from "./ProductPage";

export class HomePage extends BasePage {
    private readonly next_btn: Locator;
    private readonly previous_btn: Locator;
    private readonly categories_group: Locator;
    private readonly phones_category_btn: Locator;
    private readonly laptops_category_btn: Locator;
    private readonly monitors_category_btn: Locator;
    private readonly products_section: Locator;
    private readonly card: Locator;

    constructor(page: Page) {
        super(page);
        this.next_btn = this.page.locator('#next2')
        this.previous_btn = this.page.locator('#prev2')
        this.categories_group = this.page.locator('.list-group');
        this.phones_category_btn = this.categories_group.getByText('Phones');
        this.laptops_category_btn = this.categories_group.getByText('Laptops');
        this.monitors_category_btn = this.categories_group.getByText('Monitors');
        this.products_section = this.page.locator('#tbodyid');
        this.card = this.page.locator('#tbodyid .card-block');
    }

    getNextButton(): Locator {
        return this.next_btn;
    }

    getPreviousButton(): Locator {
        return this.previous_btn;
    }

    getCategoriesSection(): Locator {
        return this.categories_group;
    }

    getPhonesOption(): Locator {
        return this.phones_category_btn;
    }

    getLaptopsOption(): Locator {
        return this.laptops_category_btn;
    }

    getMonitorsOption(): Locator {
        return this.monitors_category_btn;
    }

    async goto(){
        await this.page.goto('/');
    }

    async getProduct(product: string): Promise<ProductPage> {
        await this.card.filter({hasText: product}).getByRole('link').click();
        await this.page.waitForLoadState('domcontentloaded');
        return new ProductPage(this.page);
    }
}