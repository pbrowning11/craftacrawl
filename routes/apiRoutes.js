var db = require("../models");
var request = require("request");
var passport = require("../config/passport");
var express = require("express")
require('dotenv').config()
module.exports = function (app) {

  app.post("/api/googleapi/", function (req, res) {
    if (!req.user) {
      console.log('not logged')
      res.sendStatus(404)
      return
    }
    var barArr = JSON.parse("[" + req.body.barList + "]");
    var groupNam = req.body.crawlName
    var barArr2 = [];
    console.log("");
    console.log("These are the ids of the filtered bars from the database: " + barArr);
    var morePromises = [];
    var correctedArr = [];

    barArr.forEach(function (bar) {
      morePromises.push(
        db.Bar.findOne({
          where: {
            id: bar
          }
        }));
    });
    Promise.all(morePromises).then(function (rest) {
      rest.forEach(element => {
        barArr2.push(element.street + "," + element.zip);
      });
      console.log("Bar address array:");
      console.log(barArr2);
      console.log("some info", req.body)
      // Google Maps API Query Start
      var apikey = `&key=${process.env.APIKEY}&`;

      // Wanna learn how to use parameters as an object...
      // var params = {
      //   origin: barArr2[0] + "Charlotte+NC&", // Starting Address
      //   destination: barArr2[1],
      //   mode: "walking&", // Mode of Travel; Can be 'driving', 'walking', 'bicycling', or 'transit';
      //   waypoints: "waypoints=optimize:true",
      //   // Waypoints are extra stops in between the origin and destination; To be formatted as follows:
      //   // &waypoints=Charlotte|Raleigh|...
      //   // You can supply one or more locations separated by the pipe character (|), in the form of an address, latitude/longitude coordinates, or a place ID:
      // }

      var queryUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + barArr2[0] + "&destination=" + barArr2[1] + "&mode=walking&waypoints=optimize:true|";
      console.log("------------------------------------");
      console.log("Running URL address loop for " + Number(barArr2.length - 2) + " addresses!");
      console.log("------------------------------------");

      for (var i = 2; i < barArr2.length; i++) {
        queryUrl = queryUrl + (barArr2[i] + "|");
      }
      ;
      queryUrl = queryUrl + apikey;
      console.log("");
      console.log(queryUrl);

      request(queryUrl, function (error, response, body) {
        if (error) {
          console.log("error:", error);
        }
        ; // Print the error if one occurred

        var google = JSON.parse(body).routes[0];
        // console.log(JSON.parse(body).routes[0].legs);

        google.legs.forEach(element => {

        });

        correctedArr.push(barArr[0]);
        for (var i = 0; i < google.waypoint_order.length; i++) {
          var waypointId = google.waypoint_order[i] + 2;
          correctedArr.push(barArr[waypointId]);
        }
        correctedArr.push(barArr[1]);
        console.log("Adjusted Route:");
        console.log(correctedArr);
        // pushIt(correctedArr,groupNam)
        console.log("I made it all the way here", req.user.id)


        db.Crawl.create({
          owner: req.user.id,
          crawlName: groupNam,
          barList: correctedArr.toString(),
        })
          .then(function (dbcrawl) {
            console.log(dbcrawl)
            console.log("I made into the .then")
            res.json(dbcrawl);
          });
      })
    })
  })

  // function pushIt (finBarArr, crawlName) {
  //   console.log("here")
  //   console.log(finBarArr);

  //   db.Crawl.create({
  //     crawlName: crawlName,
  //     barList: finBarArr.toString()
  //   })
  //     .then(function (dbcrawl) {
  //       //res.json(dbcrawl);
  //     });

  //   // console.log(req.body);
  //   // db.Crawl.create(req.body).then(function (dbcrawl) {
  //   //   res.json(dbcrawl);
  //   // });
  // };


  app.get("/crawl/:crawl", function (req, res) {
    db.Crawl.findOne({
      where: {
        crawlName: req.params.crawl
      }
    }).then(function (crawlInfo) {
      var barArray = [];
      var promises = [];
      var crawlArray = JSON.parse("[" + crawlInfo.dataValues.barList + "]");
      console.log(crawlArray);
      crawlArray.forEach(function (position) {
        promises.push(
          db.Bar.findOne({
            where: {
              id: position,
              
            }
          }));
      });
      Promise.all(promises).then(function (barsAr) {
        console.log(barArray);
        res.render("results", {
          bars: barsAr,
          whereAt : crawlInfo.dataValues.position
            
        });
      });
    });
  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/")
  });

  // app.get("api/signin", function(req, res) {

  // })

  app.post("/api/signup", function (req, res) {
    var newUser = req.body.data;
    console.log(req.body.data);
    db.User.findOrCreate({
      where: {
        email: newUser.email
      },
      defaults: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        Password: newUser.password
      }
    }).then(function (newUser) {
      res.json(newUser)
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });
  app.get("/api/neighborhood/:hood", function (req, res) {
    console.log(req.params.hood);

    db.Bar.findAll({
      where: {
        neighborhood: req.params.hood
      }
    }).then(function (sendthehood) {
      res.render("hood", {
        hood: sendthehood
      });
    });
  });
  app.get("/api/category/:cat", function (req, res) {
    console.log(req.params.hood);
    db.Bar.findAll({
      where: {
        cat1: req.params.cat
      }
    }).then(function (sendthehood) {
      res.render("hood", {
        hood: sendthehood
      });
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/")
  });

  app.post("/submit", function (req, res) {
    if (req.user) {
      console.log('==============================================================================================')
      console.log(req.body)

      console.log('==============================================================================================')
      db.submittedBar.create(
        req.body
      ).then(function (newBar) {
        res.json(newBar);
      })
    } else {
      res.sendStatus(404)
    }
  })
  app.get("/api/loginCheck", (req, res) => {
    console.log("checking")
    if (req.user) {
      console.log(req.user)
      res.send({ login: true })
    } else {
      res.send({ login: false })
    }
  })
  app.get("/api/isOwner/:crawl", (req, res) => {

    db.Crawl.findOne({
      where: {
        crawlName: req.params.crawl
      }
    }).then(function (crawlInfo) {
      if (req.user) {
        console.log(crawlInfo.owner, req.user.id, '<=====')
        console.log(crawlInfo.owner === req.user.id)
        if (crawlInfo.owner === req.user.id) {
          res.json({ rightUser: true })
          return
        }
        res.json({ rightUser: false })
      }
      res.json({ rightUser: false })
    })
  })
  app.post("/api/updateLocation/", (req, res) => {
    console.log(req.body.crawld)
    db.Crawl.update({
      position: parseInt(req.body.position)+1
    },{ where: { crawlName: req.body.crawld, owner: req.user.id } })
     .then((resultz)=>{
       console.log(resultz)
       res.sendStatus(200)
     })
  })

};
