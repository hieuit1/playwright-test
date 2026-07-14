import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

// Đọc cấu hình môi trường từ biến hệ thống, mặc định là 'qa'
const environment = process.env.ENV || "qa";
dotenv.config({ path: path.resolve(__dirname, `src/config/.env.${environment}`) });

export default defineConfig({
    testDir: "./tests",
    timeout: 60000,
    workers: process.env.CI ? "50%" : undefined,
    expect: {
        timeout: 5000,
    },
    retries: process.env.CI ? 2 : 0, // Tự động thử lại trên CI để giảm thiểu flaky test
    use: {
        launchOptions: {
            args: ["--disable-blink-features=AutomationControlled"],
        },
        channel: "chrome",
        actionTimeout: 15000,
        baseURL: process.env.BASE_URL || "https://example.com",
        headless: process.env.CI ? true : false,
        screenshot: "on",
        video: "on",
        trace: "on-first-retry",
    },
    reporter: [
        ["html"],
        [
            "allure-playwright",
            {
                detail: true,
                outputFolder: "allure-results",
            },
        ],
    ],
});