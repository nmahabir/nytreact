const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

// Define middleware here

// Use morgan logger for logging requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Define API routes here
app.get("/", function(req, res) {
  res.render("index");
});

// A GET route for scraping the NYTimes website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.nytimes.com/section/travel").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);
    // article.css-180b3ld
    // console.log(response.data);
    // 3Now, we grab every h2 within an article tag, and do the following:
    $(".story-body").each(function(i, element) {
      // Save an empty result object
      let result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text()
        .trim();
      result.link = $(this)
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children("summary")
        .text()
        .trim();
      console.log("Result: " + result);
      //   Create a new Article using the `result` object built from scraping
      db.article.create(result).then(function(dbArticle) {
        // View the added result in the console
        // console.log("DB Article: " + dbArticle);
        res.render("index", { articles: dbArticle });
      });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    // res.send("Scrape Complete");
    // res.render("index", {articles: dbArticle.title}, {summary: dbArticle.summary}, {link: dbArticle.link});
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  db.article.find({}).then(function(dbArticle) {
    res.render("index", { articles: dbArticle });
  });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  db.article
    .find({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.render("index", { articles: dbArticle });
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  db.note
    .create(req.body)
    .then(function(dbNote) {
      return db.article.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          note: dbNote._id
        },
        {
          new: true
        }
      );
    })
    .catch(function(dbArticle) {
      res.render("index", { articles: dbArticle });
    });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
