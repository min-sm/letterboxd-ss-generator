import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  // await page.setJavaScriptEnabled(false);
  await page.goto("https://letterboxd.com/aksually/film/barbie/", {
    waitUntil: "load",
  });
  // await page.waitForSelector(
  //   `img[src^="https://a.ltrbxd.com/resized/film-poster"]`
  // );

  // Get the text content of the <p> element
  const pElementText = await page.evaluate(() => {
    // review
    // const pElement = document.querySelector("div.review > div > div > p");

    // reviewer's name
    // const pElement = document.querySelector("span[itemprop='name']");

    // movie's poster
    const imgElement = document.querySelector(
      `img[src^="https://a.ltrbxd.com/resized/film-poster"]`
    );

    return imgElement ? imgElement.src.trim() : null;
  });

  console.log("Text content of <p> element:", pElementText);
  await page.screenshot({ path: "screenshot.png" });

  await browser.close();
})();
