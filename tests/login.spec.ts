import { test, expect } from "../src/fixtures/baseTest";

test.describe("Login Tests @regression", () => {
    test.beforeEach(async ({ loginPage }) => {
        // Navigate to the login page (relative to baseURL)
        await loginPage.navigateTo("/login");
    });

    test("Should display error message on incorrect email or password", async ({ loginPage }) => {
        // Attempt login with invalid credentials
        await loginPage.login("invalid_user_12345@testdomain.com", "WrongPassword123");
        
        // Assert error message is visible and matches expected text
        const isErrorVisible = await loginPage.isErrorMessageVisible();
        expect(isErrorVisible).toBe(true);

        const errorText = await loginPage.getErrorMessageText();
        expect(errorText).toBe("Your email or password is incorrect!");
    });
});
