import puppeteer from "puppeteer";
import fs from "fs"; // Import the fs (file system) module

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(
    "https://a.ltrbxd.com/resized/film-poster/2/7/7/0/6/4/277064-barbie-0-230-0-345-crop.jpg",
    {
      waitUntil: "networkidle0",
    }
  );

  // Get the image URL from the current page
  const imageUrl = await page.evaluate(() => document.querySelector("img").src);

  // Download the image using fs module
  const response = await page.goto(imageUrl);
  const buffer = await response.buffer();
  await fs.promises.writeFile("downloadedImage.jpg", buffer);

  await browser.close();
})();
