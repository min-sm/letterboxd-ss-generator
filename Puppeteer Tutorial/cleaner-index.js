import puppeteer from "puppeteer";
import fs from "fs"; // Import the fs (file system) module
import { log } from "console";

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto("https://letterboxd.com/aksually/film/barbie/", {
    waitUntil: "load",
  });

  // Get the text content of the <p> element
  // review
  const review = await page.evaluate(() => {
    const reviewElement = document.querySelector("div.review > div > div > p");
    return reviewElement ? reviewElement.textContent.trim() : null;
  });

  const reviewerName = await page.evaluate(() => {
    const reviewerNameElement = document.querySelector(`span[itemprop='name']`);
    return reviewerNameElement ? reviewerNameElement.textContent.trim() : null;
  });

  const movieName = await page.evaluate(() => {
    const movieNameElement = document.querySelector(
      `span.film-title-wrapper>a`
    );
    return movieNameElement ? movieNameElement.textContent.trim() : null;
  });

  const movieYear = await page.evaluate(() => {
    const movieYearElement = document.querySelector(
      `span.film-title-wrapper>small>a`
    );
    return movieYearElement ? movieYearElement.textContent.trim() : null;
  });

  const rating = await page.evaluate(() => {
    const ratingElement = document.querySelector(`span.rating.rating-large`);
    return ratingElement ? ratingElement.textContent.trim() : null;
  });

  const watchedDate = await page.evaluate(() => {
    const watchedDateElement = document.querySelector(`p.view-date.date-links`);
    return watchedDateElement
      ? watchedDateElement.textContent.replace(/\s+/g, " ").trim()
      : null;
  });

  const likes = await page.evaluate(() => {
    const likesElement = document.querySelector(
      `p.like-link-target`
      // `p.like-link-target>span.like-link>a[href$="/likes/"]`
    );
    return likesElement ? likesElement.textContent.trim() : null;
  });

  console.log(watchedDate);
  console.log(
    `
Movie: ${movieName}
Reviewer: ${reviewerName}
Review: ${review}
Release Year: ${movieYear}
Rating: ${rating}
Watched: ${watchedDate}
Likes: ${likes}
`
  );
  // const newDimensions = "-0-1000-0-1500-";
  // const replacedUrl = pElementText.replace(/-0-(\d+)-0-(\d+)-/, newDimensions);
  // const response = await page.goto(replacedUrl);
  // const buffer = await response.buffer();
  // await fs.promises.writeFile("downloadedImage.jpg", buffer);
  // await page.screenshot({ path: "screenshot.png" });

  await browser.close();
})();
