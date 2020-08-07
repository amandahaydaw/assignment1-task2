let myLocation = [-37.602699, 144.942993];// splash craigieburn
let Driver1 = [-37.62581, 144.92555];//Roxburghpark
let Driver2 = [-37.581372, 144.922547];//craigieburn shopping center
let Driver3 = [-37.59751, 144.92811];//craigieburn plaza
let size = 36;
let count;
let counter;
let map = L.map('map').setView(myLocation, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);


// // Set up the OSM layer
// L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=k59916mdVySDlBcjB4Ea', {
//   attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
// }).addTo(map);
let searchControl = L.esri.Geocoding.geosearch().addTo(map);

//marker driver1
driver1 = L.icon({ iconUrl: 'car.png', iconSize: [size, size], iconAnchor: [12, 39], shadowUrl: null });
//marker driver2
driver2 = L.icon({ iconUrl: 'carSouth.png', iconSize: [size, size], iconAnchor: [12, 39], shadowUrl: null });
//marker driver3
driver3 = L.icon({ iconUrl: 'carWest.png', iconSize: [size, size], iconAnchor: [12, 39], shadowUrl: null });
// add a marker in the given location

L.marker(myLocation).addTo(map).bindPopup('<b>My Location</b>');


L.marker(Driver1, { icon: driver1 }).addTo(map).bindPopup('About 12km away from you.');
L.marker(Driver2, { icon: driver2 }).addTo(map).bindPopup('About 18km away from you.');
L.marker(Driver3, { icon: driver3 }).addTo(map).bindPopup('About 14km away from you.');


let results = L.layerGroup().addTo(map).bindPopup('Search Location')
searchControl.on('results', function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});

function resetEverything() {
  $("#counter, #myButton03").hide();
  $('#myButton02').show();
  clearInterval(counter);
}
$(document).ready(function () {
  resetEverything();
  $('#myButton02').click(function () {
    $('#myButton02').hide();
    $('#myButton03').show();
    $('#counter').animate({ width: 'toggle' });
    count = 60;
    counter = setInterval(timer, 1000);
    function timer() {
      count = count - 1;
      if (count <= 0) {
        clearInterval(counter);
        alert('Driver arrived');
        return;
      }


      document.getElementById("secs").innerHTML = "00:" + count + " secs.";
    }
  });

  $('#myButton03').click(function () {
    resetEverything();
  });
});