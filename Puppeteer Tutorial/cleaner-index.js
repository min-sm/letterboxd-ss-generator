"use strict";
import puppeteer from "puppeteer";
import fs from "fs"; // Import the fs (file system) module
import { log } from "console";
import getTextContent from "./src/utilities/extractText.js";

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(
    // "https://letterboxd.com/nathanpcasper/film/punch-drunk-love/",
    "https://letterboxd.com/iovewitch/film/immaculate-2024/",
    {
      waitUntil: "load",
    }
  );

  // Get the text content of the <p> element
  // review
  const [review, hasSpoiler] = await page.evaluate(() => {
    const spoilerElement = document.querySelector(
      `div.review>div.contains-spoilers`
    );
    const reviewElement = document.querySelector(
      "div.review div > h3 ~ div > p"
    );
    return reviewElement
      ? [
          reviewElement.textContent.trim(),
          spoilerElement == null ? false : true,
        ]
      : null;
  });

  // const reviewerName = await page.evaluate(() => {
  //   const reviewerNameElement = document.querySelector(`span[itemprop='name']`);
  //   return reviewerNameElement ? reviewerNameElement.textContent.trim() : null;
  // });

  const reviewerName = await getTextContent(page, `span[itemprop='name']`);

  // const movieName = await page.evaluate(() => {
  //   const movieNameElement = document.querySelector(
  //     `span.film-title-wrapper>a`
  //   );
  //   return movieNameElement ? movieNameElement.textContent.trim() : null;
  // });

  const movieName = await getTextContent(page, `span.film-title-wrapper>a`);

  // const movieYear = await page.evaluate(() => {
  //   const movieYearElement = document.querySelector(
  //     `span.film-title-wrapper>small>a`
  //   );
  //   return movieYearElement ? movieYearElement.textContent.trim() : null;
  // });

  const movieYear = await getTextContent(
    page,
    `span.film-title-wrapper>small>a`
  );

  // const rating = await page.evaluate(() => {
  //   const ratingElement = document.querySelector(`span.rating.rating-large`);
  //   return ratingElement ? ratingElement.textContent.trim() : null;
  // });

  const rating = await getTextContent(page, `span.rating.rating-large`);

  const watchedDate = await page.evaluate(() => {
    const watchedDateElement = document.querySelector(`p.view-date.date-links`);
    return watchedDateElement
      ? watchedDateElement.textContent.replace(/\s+/g, " ").trim()
      : null;
  });

  // const likes = await page.evaluate(() => {
  //   const likesElement = document.querySelector(`p.like-link-target`);
  //   return likesElement ? likesElement.textContent.trim() : null;
  // });

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
