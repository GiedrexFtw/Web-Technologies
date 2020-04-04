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
    console.log(formlist);
    if(formlist!=null){
        formlist.forEach(form => {
            let newmarker=new google.maps.Marker({position:form.position, map:map, title:form.title});
        })
    }
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
  