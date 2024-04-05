"use strict";
const express = require("express");
const app = express();
const puppeteer = require("puppeteer");

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
      // headless: false,
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

    // res.json({
    //   movieName,
    //   reviewerName,
    //   review,
    //   movieYear,
    //   rating,
    //   watchedDate,
    //   likes,
    //   hasSpoiler,
    // });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the review" });
  }
});

app.listen(3000);
