"use strict";
import puppeteer from "puppeteer";
// import fs from "fs"; // Import the fs (file system) module
// import { log } from "console";
import { getTextContent, hasSpoilers } from "./src/utilities/extractText.js";

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(
    "https://letterboxd.com/nathanpcasper/film/punch-drunk-love/",
    // "https://letterboxd.com/iovewitch/film/immaculate-2024/",
    {
      waitUntil: "load",
    }
  );

  // const [review, hasSpoiler] = await page.evaluate(() => {
  //   const spoilerElement = document.querySelector(
  //     `div.review>div.contains-spoilers`
  //   );
  //   const reviewElement = document.querySelector(
  //     "div.review div > h3 ~ div > p"
  //   );
  //   return reviewElement
  //     ? [
  //         reviewElement.textContent.trim(),
  //         spoilerElement == null ? false : true,
  //       ]
  //     : null;
  // });

  const hasSpoiler = await hasSpoilers(page);

  const review = await getTextContent(page, `div.review div > h3 ~ div > p`);
  // const review = "";

  const reviewerName = await getTextContent(page, `span[itemprop='name']`);

  const movieName = await getTextContent(page, `span.film-title-wrapper>a`);

  const movieYear = await getTextContent(
    page,
    `span.film-title-wrapper>small>a`
  );

  const rating = await getTextContent(page, `span.rating.rating-large`);

  // const watchedDate = await page.evaluate(() => {
  //   const watchedDateElement = document.querySelector(`p.view-date.date-links`);
  //   return watchedDateElement
  //     ? watchedDateElement.textContent.replace(/\s+/g, " ").trim()
  //     : null;
  // });

  let watchedDate = await getTextContent(page, `p.view-date.date-links`);
  watchedDate = watchedDate.replace(/\s+/g, " ");

  const likes = await getTextContent(page, `p.like-link-target`);

  console.log(
    `
Movie: ${movieName}
Reviewer: ${reviewerName}
${hasSpoiler ? "This review may contain spoilers.\n" : ""}Review: ${review}
Release Year: ${movieYear}
Rating: ${rating}
Watched: ${watchedDate}
Likes: ${likes}
`
  );
  await browser.close();
})();
