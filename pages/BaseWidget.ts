import {Page} from "@playwright/test";

export class BaseWidget {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }
}