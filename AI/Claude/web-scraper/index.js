const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/scrape", async (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).send("Please provide a valid URL.");
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Scrape the data you need from the page
    const data = await page.evaluate(() => {
      // Your scraping logic here
      return {
        title: document.title,
        headingText: document
          .querySelector(`span[itemprop='name']`)
          .textContent.trim(),
        // Add more selectors as needed

        //   const element = document.querySelector(`span[itemprop='name']`);
        //   return element ? element.textContent.trim() : null;
      };
    });

    await browser.close();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while scraping the data.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
