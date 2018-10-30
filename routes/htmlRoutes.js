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
  });
};
