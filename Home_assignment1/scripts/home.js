let bg=document.getElementById("bg");
let moon=document.getElementById("moon");
let mountain=document.getElementById("mountain");
let road=document.getElementById("road");
let name=document.getElementById("name");
let topnav=document.getElementsByClassName("topnav");
//localStorage.clear();
window.addEventListener("scroll", function(){
    let valY=window.scrollY;
    bg.style.left=valY * 5 + "px";
    moon.style.top=valY * 1.5 + "px";
    mountain.style.top=valY * 0.25 + "px";
    name.style.top=valY*0.5+"px";
})

showPosition();
function showPosition() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap, showError);
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }
  // Define callback function for successful attempt
  function showMap(position) {
    // Get location data
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    var latlong = new google.maps.LatLng(lat, long);
    
    var myOptions = {
        center: latlong,
        zoom: 10,
        mapTypeControl: true,
        navigationControlOptions: {
            style:google.maps.NavigationControlStyle.SMALL
        }
    }
    var map = new google.maps.Map(document.getElementById("embedMap"), myOptions);
    var marker = new google.maps.Marker({ position:latlong, map:map, title:"You are here!" });
    let formlist=JSON.parse(localStorage.getItem("formList"));
    //console.log(formlist);
    let sumkm=0;
    if(formlist!=null){
        
        formlist.forEach(form => {
            let newmarker=new google.maps.Marker({position:form.position, map:map, title:form.title});
            let line = new google.maps.Polyline({path: [marker.position, newmarker.position], map: map});
            let distance = haversine_distance(newmarker, marker);
            sumkm=sumkm+distance;
        })
        //let distancemsg=document.createElement("p");
        //distancemsg.style.fontSize="36px";
        //distancemsg.style.alignContent="center";
        //distancemsg.className="item5";
        document.getElementById("distancemsg");
        distancemsg.textContent=`Total distance covered from current spot in Ljubljana to other travel destinations: ~${sumkm.toFixed(2)}km`;
        distancemsg.style.color="Coral";
        distancemsg.style.fontSize="36px";
        //document.body.appendChild(distancemsg);
    }
  }
  function haversine_distance(mk1, mk2) {
    var R = 6371.0710; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*
    Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }
  // Define callback function for failed attempt
  function showError(error) {
    if(error.code == 1) {
        result.innerHTML = "You've decided not to share your position, but it's OK. We won't ask you again.";
    } else if(error.code == 2) {
        result.innerHTML = "The network is down or the positioning service can't be reached.";
    } else if(error.code == 3) {
        result.innerHTML = "The attempt timed out before it could get the location data.";
    } else {
        result.innerHTML = "Geolocation failed due to unknown error.";
    }
  }
  