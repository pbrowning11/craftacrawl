<<<<<<< HEAD
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");

module.exports = function(app, passport) {
  app.get("/", isAuthenticated, function(req, res) {
    if(req.user) {
      res.redirect("/home") //logged in home page
    }
    res.redirect("/home")
  })
  app.get("/signup", function(req, res) {

    res.sendFile(path.join(__dirname, "../views/signup.html"));
  });

  app.get("/signin", function(req, res) {
    if (req.user) {
      res.redirect("/home") //logged in home page
    }
    res.sendFile(path.join(__dirname, "../views/signin.html"))
=======
const db = require("../models");
const path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home.html"));
  });
  app.get("/submit", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/submit.html"));
  });
  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/create.html"));
>>>>>>> 4fb79273a0179a357baadb91773bbae77c3c5d82
  });
  app.get("/choose", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/choose.html"));
  });
  app.get("/thanks", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/thanks.html"));
  });

  // app.get("*", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../views/404.html"));
  // });
};
