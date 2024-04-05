"use strict";
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.static("src"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000);
