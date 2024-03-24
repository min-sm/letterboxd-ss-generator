import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto("https://google.com", {
    waitUntil: "networkidle0",
  });

  // Get the text content of the <p> element
  const pElementText = await page.evaluate(() => {
    return document.querySelector("div#SIvCob").textContent;
    // return pElement ? pElement.textContent.trim() : null;
  });

  console.log("Text content of <p> element:", pElementText);

  await browser.close();
})();
