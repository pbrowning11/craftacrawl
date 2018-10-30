const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const path = require("path");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/home.html"));
  });
  app.get("/submit", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/submit.html"));
  });
  app.get("/create", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/create.html"));
  });
  app.get("/choose", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/choose.html"));
  });
  app.get("/thanks", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/thanks.html"));
  });

  app.get("/", isAuthenticated, function (req, res) {

    res.redirect("/home")
  })
  app.get("/signup", function (req, res) {

    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });
  app.get("/signin", function (req, res) {

    res.sendFile(path.join(__dirname, "../views/signin.html"))


    // app.get("*", function(req, res) {
    //   res.sendFile(path.join(__dirname, "../views/404.html"));
    // });
  });
};

