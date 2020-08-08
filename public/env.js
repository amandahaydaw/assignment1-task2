//declare
let myLocation = [-37.602699, 144.942993];// Craigieburn, Victoria 3064
let Driver1 = [-37.62581, 144.92555];//9 Sheridan Way, Roxburgh Park VIC 3064
let Driver2 = [-37.581372, 144.922547];//16-2 Somersby Rd, Craigieburn VIC 3064
let Driver3 = [-37.59751, 144.92811];//199-219 Craigieburn Rd, Craigieburn VIC 3064
let size = 36;
let time;
let timer;
// initialize the map with zoom 13
let map = L.map('map').setView(myLocation, 13);
//creating geocoding control and then adding it to the map
let searches = L.esri.Geocoding.geosearch().addTo(map);
//load and display tile layers on the map along with attibution of leaflet
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

//declaring marker driver1 to be used on the map with icon
driver1 = L.icon({ iconUrl: 'car.png', iconSize: [size, size], iconAnchor: [12, 39] });
//declaring marker driver2 to be used on the map with icon
driver2 = L.icon({ iconUrl: 'carSouth.png', iconSize: [size, size], iconAnchor: [12, 39] });
//declaring marker driver3 to be used on the map with icon
driver3 = L.icon({ iconUrl: 'carWest.png', iconSize: [size, size], iconAnchor: [12, 39] });
// add marker for my location
L.marker(myLocation).addTo(map).bindPopup('<b>My Location</b>');
//adding marker driver1 to the map with icon assigned
L.marker(Driver1, { icon: driver1 }).addTo(map).bindPopup('<b style="color:red;">Driver 4.2km away from you.</b>').openTooltip();
//adding marker driver2 to the map with icon assigned
L.marker(Driver2, { icon: driver2 }).addTo(map).bindPopup('<b style="color:red;">Driver 4.6km away from you.</b>');
//adding marker driver3 to the map with icon assigned
L.marker(Driver3, { icon: driver3 }).addTo(map).bindPopup('<b style="color:red;">Driver 1.8km away from you.</b>');

//method to enable search for an address and display the result on map

//add layer to the map
let results = L.layerGroup().addTo(map).bindPopup('Search Location');
//after search result
searches.on('results', function (data) {

  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng));
  }
});
//reset method once click on cancel ride  as well cancel ride button will be hiden from UI ,will only show once click on find driver
function resetEverything() {
  $("#timer, #Btn3").hide();
  $('#Btn2').show();
  clearInterval(timer);
}
$(document).ready(function () {
  resetEverything();
  //once button "find driver" enabled then "cancel driver" button will display and find driver button will display
  $('#Btn2').click(function () {
    $('#Btn2').hide();
    $('#Btn3').show();
    $('#timer').animate({ width: 'toggle' });
    //time set to 1 min ` = 60 secs
    time = 60;
    //timer using set interval 
    timer = setInterval(timer, 1000);
    function timer() {
      time = time - 1;
      //if time reached 0 then display message that driver arrived 
      if (time <= 0) {
        clearInterval(timer);
        alert('Driver arrived!, Please find your way to the car').html(style.color = "red");
        return;
      }

      //time printing
      $('#secs').html("00:" + time + " secs.");
    }
  });
  //clear timer once clicked on cancel driver
  $('#Btn3').click(function () {
    resetEverything();
  });
});