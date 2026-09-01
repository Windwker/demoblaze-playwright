import {Locator, Page} from "@playwright/test";
import {HomePage} from "./HomePage";

export class BasePage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async getCurrentPageTitle(): Promise<string> {
        return this.page.title();
    }
}