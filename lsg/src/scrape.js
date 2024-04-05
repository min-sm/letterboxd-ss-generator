"use strict";
// import puppeteer from "puppeteer";
// import { getTextContent, hasSpoilers } from "./utilities/extractText.js";

const puppeteer = require("puppeteer");
let { getTextContent, hasSpoilers } = require("./utilities/extractText.js");

export async function run(reveiwLink) {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
  await page.goto(`${reviweLink}`, {
    waitUntil: "load",
  });

  const hasSpoiler = await hasSpoilers(page);

  const review = await getTextContent(page, `div.review div > h3 ~ div > p`);

  const reviewerName = await getTextContent(page, `span[itemprop='name']`);

  const movieName = await getTextContent(page, `span.film-title-wrapper>a`);

  const movieYear = await getTextContent(
    page,
    `span.film-title-wrapper>small>a`
  );

  const rating = await getTextContent(page, `span.rating.rating-large`);

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
  return {
    movie: movie,
    reviewer: reviewerName,
    hasSpoiler: hasSpoiler,
    review: review,
    releasedYear: movieYear,
    rating: rating,
    watchedDate: watchedDate,
    likes: likes,
  };
}
// (async () => {
//   const browser = await puppeteer.launch({
//     // headless: false,
//     defaultViewport: false,
//     userDataDir: "./tmp",
//   });

//   const page = await browser.newPage();
//   await page.goto(
//     "https://letterboxd.com/nathanpcasper/film/punch-drunk-love/",
//     // "https://letterboxd.com/iovewitch/film/immaculate-2024/",
//     {
//       waitUntil: "load",
//     }
//   );

//   const hasSpoiler = await hasSpoilers(page);

//   const review = await getTextContent(page, `div.review div > h3 ~ div > p`);
//   // const review = "";

//   const reviewerName = await getTextContent(page, `span[itemprop='name']`);

//   const movieName = await getTextContent(page, `span.film-title-wrapper>a`);

//   const movieYear = await getTextContent(
//     page,
//     `span.film-title-wrapper>small>a`
//   );

//   const rating = await getTextContent(page, `span.rating.rating-large`);

//   let watchedDate = await getTextContent(page, `p.view-date.date-links`);
//   watchedDate = watchedDate.replace(/\s+/g, " ");

//   const likes = await getTextContent(page, `p.like-link-target`);

//   console.log(
//     `
// Movie: ${movieName}
// Reviewer: ${reviewerName}
// ${hasSpoiler ? "This review may contain spoilers.\n" : ""}Review: ${review}
// Release Year: ${movieYear}
// Rating: ${rating}
// Watched: ${watchedDate}
// Likes: ${likes}
// `
//   );
//   await browser.close();
// })();
