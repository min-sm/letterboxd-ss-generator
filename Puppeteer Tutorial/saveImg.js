import puppeteer from "puppeteer";
import fs from "fs"; // Import the fs (file system) module

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  // await page.setJavaScriptEnabled(false);
  await page.goto("https://letterboxd.com/iovewitch/film/immaculate-2024/", {
    waitUntil: "load",
  });

  // Get the text content of the <p> element
  const pElementText = await page.evaluate(() => {
    // movie's poster
    let imgElement = document.querySelector(
      `img[src^="https://a.ltrbxd.com/resized/avatar/upload/"]`
    );
    // imgElement =
    //   imgElement ??
    //   document.querySelector(
    //     `img[src^="https://a.ltrbxd.com/resized/film-poster/"]`
    //   );
    return imgElement ? imgElement.src.trim() : null;
  });
  console.log("Text content of <p> element:", pElementText);

  const newDimensions = "-0-1000-0-1000-";
  const replacedUrl = pElementText.replace(/-0-(\d+)-0-(\d+)-/, newDimensions);
  const response = await page.goto(replacedUrl);
  const buffer = await response.buffer();
  await fs.promises.writeFile("downloadedImage.jpg", buffer);
  // await page.screenshot({ path: "screenshot.png" });

  await browser.close();
})();
