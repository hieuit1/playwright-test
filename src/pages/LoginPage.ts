import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    private readonly emailInput = '[data-qa="login-email"]';
    private readonly passwordInput = '[data-qa="login-password"]';
    private readonly loginButton = '[data-qa="login-button"]';
    private readonly errorMessage = 'text=Your email or password is incorrect!';

    constructor(page: Page) {
        super(page);
    }

    /**
     * Performs login operation with email and password
     */
    async login(email: string, password: string): Promise<void> {
        await this.typeInto(this.emailInput, email);
        await this.typeInto(this.passwordInput, password);
        await this.clickOn(this.loginButton);
    }

    /**
     * Gets the error message text
     */
    async getErrorMessageText(): Promise<string> {
        return await this.getElementText(this.errorMessage);
    }

    /**
     * Checks if the error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.page.locator(this.errorMessage).isVisible();
    }
}
