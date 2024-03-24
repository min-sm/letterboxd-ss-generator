import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.goto("https://letterboxd.com/mollysauce/film/barbie/", {
    waitUntil: "networkidle0",
  });

  // Get the text content of the <p> element
  const pElementText = await page.evaluate(() => {
    const pElement = document.querySelector("div.review > div > div > p");
    return pElement ? pElement.textContent.trim() : null;
  });

  console.log("Text content of <p> element:", pElementText);

  await browser.close();
})();
