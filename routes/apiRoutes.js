var db = require("../models");
var passport = require("../config/passport")

module.exports = function (app) {
  // Get all examples
  app.post("/api/posts", function (req, res) {

    console.log(req.body.barList);
    db.Crawl.create({
      crawlName: req.body.crawlName,
      barList: req.body.barList.toString()
    })
      .then(function (dbcrawl) {
        res.json(dbcrawl);
      });
  });
  app.get("/crawl/:crawl", function (req, res) {

    db.Crawl.findOne({
      where: {
        crawlName: req.params.crawl
      }
    }).then(function (crawlInfo) {
      var barArray = [];
      var crawlArray = JSON.parse("[" + crawlInfo.dataValues.barList + "]");
      crawlArray.forEach(function(position) {
        db.Bar.findOne({
          where: {
            id: position
          }
        }).then(function (barInfo) {
          console.log(barInfo.dataValues)
          barArray.push(barInfo.dataValues)
        });
      });

      console.log(barArray);
      res.json(barArray);
    });
  });

  app.post("/api/signin", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/signin"
  }));

  
  app.post("/api/signup", function(req,res) {
    var newUser = req.body.data
    console.log(req.body.data)
    db.User.findOrCreate({
      where: {
      email: newUser.email,
      }, 
      defaults: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      Password: newUser.password
      }
    }).then(function() {
      res.redirect(307, "/api/signin");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  })
}