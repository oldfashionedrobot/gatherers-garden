const fs = require("fs");
const express = require("express");
const compileSass = require("express-compile-sass");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  compileSass({
    root: __dirname + "/client",
    sourceMap: true, // Includes Base64 encoded source maps in output css
    sourceComments: true, // Includes source comments in output css
    watchFiles: true, // Watches sass files and updates mtime on main files for each change
    logToConsole: false, // If true, will log to console.error on errors
  })
);

// serve up static asset files
app.use("/assets", express.static("client"));

// serve up SPA
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// API endpoints
app.post("/hello/:param_one/:param_two", (req, res) => {
  const newBody = req.body;
  const paramOne = req.params["param_one"];
  const paramTwo = req.params["param_two"];

  res.json({ ...newBody, paramOne, paramTwo });
});

app.listen(port, () => {
  console.log(`GG listening at http://localhost:${port}`);
});
