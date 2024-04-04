const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Here");
  //   res.sendStatus(404);
  res.send("Welcome to the");
});

app.listen(3000);
