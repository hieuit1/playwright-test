import { Page } from "@playwright/test";
import * as allure from "allure-js-commons";

export async function customStep(
    page: Page,
    stepName: string,
    action: () => Promise<void>
): Promise<void> {
    await allure.step(stepName, async () => {
        try {
            await action();
        } finally {
            // Đảm bảo luôn đính kèm bằng chứng hình ảnh kể cả khi bước test thành công hay thất bại
            const screenshot = await page.screenshot({ fullPage: false });
            await allure.attachment(`Ảnh chụp: ${stepName}`, screenshot, "image/png");
        }
    });
}