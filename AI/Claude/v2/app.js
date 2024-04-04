const express = require("express");
const app = express();
const puppeteer = require("puppeteer");

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/scrape", async (req, res) => {
  const { url } = req.body;

  try {
    // Scrape the data using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Perform your web scraping logic here
    const scrapedData = await page.evaluate(() => {
      // Web scraping code here
      return {
        // Return the scraped data
      };
    });

    // Send the scraped data back to the front-end
    res.json(scrapedData);

    await browser.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred during web scraping" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
