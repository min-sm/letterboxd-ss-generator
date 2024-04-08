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
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    await page.goto(`${reveiwLink}`, {
      waitUntil: "load",
    });

    // specifying the selectors and scraping of data works here

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

    await page.goto(`http://localhost:3000/result`, {
      waitUntil: "load",
    });

    const element = await page.$("#htmlContent");
    await element.screenshot({ path: "theCard.png" });
    await browser.close();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the review" });
  }
});

app.listen(3000);
