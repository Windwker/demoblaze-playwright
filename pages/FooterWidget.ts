import {BaseWidget} from "./BaseWidget";
import {Page} from "@playwright/test";

export class FooterWidget extends BaseWidget{
    constructor(page: Page) {
        super(page);
    }
}