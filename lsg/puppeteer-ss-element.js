const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  // Navigate to the desired URL
  await page.goto("http://localhost:3000/result", {
    waitUntil: "load",
  });

  // Wait for the page to load
  //   await page.waitForNavigation();

  // Capture the screenshot of the entire page
  //   await page.screenshot({ path: "screenshot.png", fullPage: true });

  // Capture the screenshot of a specific element
  const element = await page.$("#htmlContent");
  await element.screenshot({ path: "element-screenshot.png" });

  await browser.close();
})();
