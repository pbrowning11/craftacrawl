var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.post("/api/googleapi", function (req, res) {
    var barArr = JSON.parse("[" + req.body.barList + "]");
    var barArr2 = [];
    console.log('');    
    console.log("These are the ids of the filtered bars from the database: " + barArr);
    var morePromises=[]

    barArr.forEach(function (bar) {
      morePromises.push(
      db.Bar.findOne({
        where: {
          id: bar
        }
      }))
      Promise.all(morePromises).then(function (res) {
        // console.log(res.street + ", " + res.zip);
        barArr2.push(res.street + "," + res.zip);
        console.log('');
        console.log("Bar address array:");
        console.log(barArr2);
        
      });

    });
    // Google Maps API Query Start    
    var apikey = "AIzaSyDu0Qtc37kImb-6q2CGWi-T9DeM0s80ZIk&"

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

    var queryUrl = "https://maps.googleapis.com/maps/api/directions/json?origin="+ barArr2[0] + "&destination=" + barArr2[1] + "&mode=walking&waypoints=optimize:true|"
    for (var i = 2; i > barArr2.length; i++){
      queryUrl += (barArr2[i]+"|");
      // console.log(queryUrl);
    }
    
  });

  app.post("/api/posts", function (req, res) {
    console.log(req.body.barList);
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
        res.render("results", {
          bars: barsAr
        });
      });
    });
  });
  app.get("/api/neighborhood/:hood", function (req, res) {
    console.log(req.params.hood)
    db.Bar.findAll({
      where: {
        neighborhood: req.params.hood
      }
    }).then(function (sendthehood) {
      res.render("hood", {
        hood: sendthehood
      });
    });
  })
}