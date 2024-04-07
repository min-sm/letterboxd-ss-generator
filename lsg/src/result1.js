const puppeteer = require("puppeteer");
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  const currentURL = window.location.href;

  // Navigate to the desired URL
  await page.goto(`${currentURL}`, {
    waitUntil: "load",
  });

  // Capture the screenshot of a specific element
  const element = await page.$("#htmlContent");
  await element.screenshot({ path: "element-screenshot.png" });

  await browser.close();
});
