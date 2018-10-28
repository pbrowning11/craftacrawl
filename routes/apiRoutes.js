var db = require("../models");

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