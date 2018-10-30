var db = require("../models");
var passport = require("../config/passport")

module.exports = function (app) {
  // Get all examples
  app.post("/api/posts", function (req, res) {


    console.log(req.body.barList);
    // Google Maps API Query Start    
    var apikey = "AIzaSyDu0Qtc37kImb-6q2CGWi-T9DeM0s80ZIk&"
    var params = {
      origin: "" + "Charlotte+NC&", // Starting Address    
      mode: "walking&", // Mode of Travel; Can be 'driving', 'walking', 'bicycling', or 'transit';
      waypoints: "waypoints=optimize:true",
      // Waypoints are extra stops in between the origin and destination; To be formatted as follows:
      // &waypoints=Charlotte|Raleigh|... 
      // You can supply one or more locations separated by the pipe character (|), in the form of an address, latitude/longitude coordinates, or a place ID:
    }
    var queryurl = "https://maps.googleapis.com/maps/api/directions/json?" + params + apikey;

    db.Crawl.create({
      crawlName: req.body.crawlName,
      barList: req.body.barList.toString()
    })
      .then(function (dbcrawl) {
        res.json(dbcrawl);
      });

    console.log(req.body);
    db.Crawl.create(req.body).then(function (dbcrawl) {
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
      var promises = [];
      var crawlArray = JSON.parse("[" + crawlInfo.dataValues.barList + "]");
      console.log(crawlArray)
      crawlArray.forEach(function (position) {
        promises.push(
          db.Bar.findOne({
            where: {
              id: position
            }
          }))
      });
      Promise.all(promises).then(function (barsAr) {
        console.log(barArray);
        res.render("results", { bars: barsAr });
      });
    });
  });

  app.post("/api/signin", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/signin"
  }));


  app.post("/api/signup", function (req, res) {
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
    }).then(function () {
      res.redirect(307, "/api/signin");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    })
  })
  app.get("/api/neighborhood/:hood", function (req, res) {
    console.log(req.params.hood)
    db.Bar.findAll({
      where: {
        neighborhood: req.params.hood
      }
    }).then(function (sendthehood) {
      res.render("hood", { hood: sendthehood });
    });
  })
}
