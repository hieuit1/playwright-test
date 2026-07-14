import { Page, Locator } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) { }

    // Hàm điều hướng chung
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: "domcontentloaded" });
    }

    // Hàm click an toàn kèm cơ chế đợi phần tử sẵn sàng hiển thị
    async clickOn(selector: string | Locator): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        await element.click();
    }

    // Hàm điền dữ liệu an toàn vào các ô nhập liệu
    async typeInto(selector: string | Locator, text: string): Promise<void> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        await element.fill(text);
    }

    // Lấy nội dung text của một phần tử giao diện
    async getElementText(selector: string | Locator): Promise<string> {
        const element = typeof selector === "string" ? this.page.locator(selector) : selector;
        await element.waitFor({ state: "visible" });
        return (await element.textContent())?.trim() || "";
    }
}