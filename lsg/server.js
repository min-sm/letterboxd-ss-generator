"use strict";
const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const https = require("https");

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
        if (sel.includes(`div.review`)) {
          return element ? element.innerHTML.trim() : null;
        }
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
      (await getTextContent(page, `div.review div > h3 ~ div`)) ??
      (await getTextContent(
        page,
        `div.review > div.show-review.hidden-spoilers > div`
      ));

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
    let posterBetterSrc = replacedUrl;

    newDimensions = "-0-1000-0-1000-";
    replacedUrl = reviewerPicSrc.replace(/-0-(\d+)-0-(\d+)-/, newDimensions);
    let reviewerPicBetterSrc = replacedUrl;

    const renderedHTML = await new Promise((resolve, reject) => {
      res.render(
        "result1",
        {
          data: {
            movieName,
            reviewerName,
            review,
            movieYear,
            rating,
            watchedDate,
            likes,
            hasSpoiler,
            posterBetterSrc,
            reviewerPicBetterSrc,
          },
        },
        (err, html) => {
          if (err) {
            reject(err);
          } else {
            resolve(html);
          }
        }
      );
    });

    // Create a new page and set its content to the rendered HTML
    const screenshotPage = await browser.newPage();
    await screenshotPage.setContent(renderedHTML);

    // Capture the screenshot of the desired element
    const element = await screenshotPage.$("#htmlContent");
    await element.screenshot({ path: "./public/assets/card.png" });

    // await browser.close();

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
        posterBetterSrc,
        reviewerPicBetterSrc,
      },
    });
    await browser.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the review" });
  }
});

app.get("/download", (req, res) => {
  const imagePath = path.join(__dirname, "public", "assets", "card.png");
  res.setHeader("Content-Disposition", "attachment; filename=card.png");
  res.setHeader("Content-Type", "image/jpeg");

  // Send the file
  res.sendFile(imagePath);
});

app.listen(3000);
