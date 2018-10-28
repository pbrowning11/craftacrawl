// The API object contains methods for each kind of request we'll make
var API = {
  submitBar: function(bar) {
    return $.ajax({
      type: "POST",
      url: "/submit",
      data: bar
    });
  },
  createCrawl: function(crawl) {
    return $.ajax({
      type: "POST",
      url: "/create",
      data: crawl
    })
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  editCrawl: function(info) {
    return $.ajax({
      type: "PUT",
      url: "/edit",
      data: info
    })
  }
};

function submitBar(event) {
  event.preventDefault();
  const bar = {
    barName: $("#Bar-Name").val().trim(),
    address: $("#Address").val().trim(),
    phoneNumber: $("#Phone-Number").val().trim(),
    email: $("#E-Mail").val().trim(),
    category: $("#category").val().trim()
  }
  API.submitBar(bar)
}

function createCrawl(event) {
  event.preventDefault();
  const crawl = {
    neighborhood: $("#neighborhood").val().trim(),
    category: $("#category").val().trim(),
    numberOf: $("#numberOf").val().trim()
  }
  API.createCrawl(crawl)
}

$("#submitBarBtn").on("click", submitBar);
$("#createCrawlBtn").on("click", createCrawl);