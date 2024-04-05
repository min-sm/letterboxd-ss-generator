const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("Here");
  //   res.sendStatus(404);
  // res.send("Welcome to the");
  // res.json({ Test: "Welcome to the test" });
  res.render("index", { test: "Welcome to the test" });
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(3000);
