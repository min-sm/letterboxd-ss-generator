"use strict";
const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const fs = require("fs");

app.use(express.static("public"));
app.use(express.static("src"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/result", async (req, res) => {
  const reveiwLink = req.body.review_link;

  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    await page.goto(`${reveiwLink}`, {
      waitUntil: "load",
    });

    async function getTextContent(page, selector) {
      const text = await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        return element ? element.textContent.trim() : null;
      }, selector);
      return text;
    }

    const hasSpoilers = async (page) => {
      const hasSpoiler = await page.evaluate(
        () =>
          document.querySelector(`div.review>div.contains-spoilers`) !== null
      );
      return hasSpoiler;
    };

    const hasSpoiler = await hasSpoilers(page);

    let review =
      (await getTextContent(page, `div.review div > h3 ~ div > p`)) ??
      (await getTextContent(page, `div.review > div > div > p`));

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

    const posterSrc = await page.evaluate((movieName) => {
      let imgElement = document.querySelector(`img[alt="${movieName}"]`);
      return imgElement ? imgElement.src.trim() : null;
    }, movieName);

    const reviewerPicSrc = await page.evaluate((reviewerName) => {
      let imgElement = document.querySelector(`img[alt="${reviewerName}"]`);
      return imgElement ? imgElement.src.trim() : null;
    }, reviewerName);

    let newDimensions = "-0-1000-0-1500-";
    let replacedUrl = posterSrc.replace(/-0-(\d+)-0-(\d+)-/, newDimensions);
    let response = await page.goto(replacedUrl);
    let buffer = await response.buffer();
    await fs.promises.writeFile("./public/assets/poster.jpg", buffer);

    newDimensions = "-0-1000-0-1000-";
    console.log(reviewerPicSrc);
    replacedUrl = reviewerPicSrc.replace(/-0-(\d+)-0-(\d+)-/, newDimensions);
    const responseRP = await page.goto(replacedUrl);
    buffer = await responseRP.buffer();
    await fs.promises.writeFile("public/assets/reviewerPic.jpg", buffer);

    await browser.close();

    res.render("result", {
      data: {
        movieName,
        reviewerName,
        review,
        movieYear,
        rating,
        watchedDate,
        likes,
        hasSpoiler,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the review" });
  }
});

app.post("/download", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    // const currentURL = window.location.href;

    // Navigate to the desired URL
    await page.goto(`http://localhost:3000/result`, {
      waitUntil: "load",
    });

    const element = await page.$("#htmlContent");
    await element.screenshot({ path: "element-screenshot.png" });

    await browser.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the review" });
  }
});

app.listen(3000);
