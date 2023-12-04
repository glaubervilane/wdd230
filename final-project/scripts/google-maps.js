function initMap() {
  // Coordinates for Location 1
  var location1 = { lat: 20.508468, lng: -86.951295 }; 
  // Coordinates for Location 2
  var location2 = { lat: 20.629273917050007, lng: -87.07097404831586 };

  // Create a map centered at Location 1
  var map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 10,
    center: location1
  });

  // Markers for Location 1 and Location 2 from Cozumel Scoots
  var marker1 = new google.maps.Marker({
    position: location1,
    map: map,
    title: 'Terminal Puerta Maya'
  });

  var marker2 = new google.maps.Marker({
    position: location2,
    map: map,
    title: 'Playa del Carmen-Cozumel Ferry dock'
  });
}