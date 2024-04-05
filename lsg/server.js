"use strict";
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.static("src"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
// import { run } from "scrape.js";
const { run } = require("./scrape.js");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scrape", async (req, res) => {
  console.log(req.body.review_link);
  res.send("URL sent");
  try {
    let scrapedData = await run(req.body.review_link);
    console.log(scrapedData);
  } catch (err) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred during web scraping" });
  }
});

app.listen(3000);
