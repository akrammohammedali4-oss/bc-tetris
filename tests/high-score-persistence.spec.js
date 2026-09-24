const { test, expect } = require("@playwright/test");

test("high score persists across reloads", async ({ page }) => {
  await page.goto("http://127.0.0.1:8000/");
  await page.evaluate(() => {
    localStorage.setItem("tetrisHighScore", "4321");
  });

  await page.reload();
  await expect(page.locator("#highScore")).toHaveText("4321");
});
