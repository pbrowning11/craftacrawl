var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.post("/api/posts", function (req, res) {
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