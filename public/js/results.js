

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
const strikes = ()=>{
    if($(".resultsArea").data("location")){

        const curr = $(".resultsArea").data("location")
        console.log(curr, '<====')
        for (let i = 0; i < curr; i++) {
            console.log(i)
            $("#barz"+i).addClass("lineT")
            
        }
    }
}
const start =()=>{
    const crawl = window.location.href.split("/"); 
    console.log(crawl[4])
    strikes()
    $.get('/api/isOwner/'+crawl[4],res=>{
        if(res.rightUser){
            $(".handlebarName").append("<i class='plus drunk fas fa-beer'></i>")
        }

    })
}
start()
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            lat: 35.22,
            lng: -80.84
        }
    });
    directionsDisplay.setMap(map);
    var onLoadHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.onLoad = onLoadHandler();
    // document.onLoad = onLoadHandler();
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    count = 0
    const another = $(".address").toArray()
    another.forEach((element,index) => {
        $("#bar"+index).prepend(labels[index]+". ")
    });
    const bars = another.map(address => {
        return {
            location: address.innerText + ", Charlotte, NC",
            stopover: true
        }
    })
    const start = bars.shift().location
    console.log(start)
    const fin = bars.pop().location
    directionsService.route({
        origin: start,
        destination: fin,
        waypoints: bars,
        optimizeWaypoints: true,
        travelMode: "WALKING",
    }, function (response, status) {
        if (status === "OK") {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
$(".resultsArea").on("click",".drunk", function(){
    console.log('here here')
    const currentBar = $(this).parent().attr('id')
    let newId =  currentBar.split("bar")
    console.log(newId)
    const crawl = window.location.href.split("/"); 
    const data = {crawld : crawl[4], position: newId[1]}
    $.post('/api/updateLocation/',data,(results)=>{
        console.log(results)
        location.reload();

    })
})
