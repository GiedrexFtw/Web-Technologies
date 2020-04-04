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
        placeMarkerAndPanTo(e.latLng, map, marker);
        google.maps.event.removeListener(listener);
      }
  });
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
function placeMarkerAndPanTo(latLng, map, marker) {//
  var newmarker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  let line = new google.maps.Polyline({path: [marker.position, newmarker.position], map: map});//
  let distance = haversine_distance(newmarker, marker);
  let positionString=JSON.stringify(newmarker.position);//
  localStorage.setItem("position", positionString);
  let distanceString=JSON.stringify(distance);
  localStorage.setItem("distance", distanceString);
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
