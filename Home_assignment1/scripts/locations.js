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
  let listener=map.addListener('click', function(e) {
      let confirmation=confirm("Are you sure this is the correct location of the trip destination?");
      //checking if not empty or cancelled
      if(confirmation==true){
        placeMarkerAndPanTo(e.latLng, map);
        google.maps.event.removeListener(listener);
      }
  });
}
function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  let positionString=JSON.stringify(marker.position);
  localStorage.setItem("position", positionString);
  //console.log(positionString);
  map.panTo(latLng);
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
