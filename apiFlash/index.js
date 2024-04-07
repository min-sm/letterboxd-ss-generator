const https = require("https");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

var apiKey = process.env.API_KEY;

https.get(
  "https://api.apiflash.com/v1/urltoimage?" +
    new URLSearchParams({
      access_key: `${apiKey}`,
      url: "https://example.com/",
      //   full_page: false,
      //   element: "section.section.col-17.col-main.overflow",
    }).toString(),
  (response) => {
    response.pipe(fs.createWriteStream("screenshot.jpeg"));
  }
);
