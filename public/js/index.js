function toDatabase() {
  var groupname=Math.floor(Math.random() * 10000000000);
  var colletedBarArray = []
    for (let l = 1; l <= 8; l++) {
      if($("#bar"+l).val()!=="default"){
        var tempHolder=parseInt($('#bar'+l).val().trim())
        console.log(tempHolder);
        colletedBarArray.push(tempHolder);
      }

    }
  console.log(colletedBarArray);
    $.post("/api/googleapi/", {crawlName:groupname,barList:colletedBarArray.toString() })
    .then(function() {
      console.log("I am here")
      window.location.href = "/crawl/"+groupname;
    });
}
function toWhere(){
  let wher = $("#chooseNeighborhood").val()
  console.log(wher)
  window.location.href = "/crawl/"+wher;
}
function loadBarSelection() {
  let choice = $("#neighborhood").val();
  if (choice === "Brewery"||choice === "Club"||choice === "Cocktail"||choice === "Cocktails"||choice === "Neighborhood"){
    window.location.href = "/api/category/" + choice;
  }
  else{
  window.location.href = "/api/neighborhood/" + choice;}
}

function submitBar() {
  let newBar = {
    barName: $("#Bar-Name").val().trim(),
    address: $("#Address").val().trim()
  }
  console.log(newBar)
  $.post("/submit", newBar)
  .then(function() {
    window.location.href = "/thanks"
  });
}

$("#createCrawlBtn").on("click", loadBarSelection);
$("#barSubmit").click( function(event) {
  event.preventDefault();
  toDatabase()
})
$("#predefined").click( function(event) {
  event.preventDefault();
  toWhere()
})
$("#submitBarBtn").click(function(event) {
  event.preventDefault();
  submitBar();
});
