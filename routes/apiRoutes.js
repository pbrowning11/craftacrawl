var db = require("../models");

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
  });
  app.get("/crawl/:crawl", function (req, res) {

    db.Crawl.findOne({
      where: {
        crawlName: req.params.crawl
      }
    }).then(function (crawlInfo) {
      var barArray = []
      var crawlArray = JSON.parse("[" + crawlInfo.dataValues.barList + "]")
      crawlArray.forEach(function (position) {
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
}