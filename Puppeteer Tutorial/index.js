import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
//   await page.goto("https://www.facebook.com/");
  await page.goto("https://letterboxd.com/", { timeout: 100_000 });
  await page.screenshot({ path: "screenshot.png" });
  await browser.close();
})();
