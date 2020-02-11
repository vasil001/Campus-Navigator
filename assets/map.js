var map ;

map = L.map( 'map', {

   center: [20.0, 5.0],
   minZoom: 2,
   zoom: 3

 }).setView([50.13004273684671, 8.692878484725952], 20);


$(window).on("resize", function() {
    $("#map").height(750).width(900);
    map.invalidateSize();
}).trigger("resize");

//	Map von Internet oder lokal
// 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// 'http://localhost:8080/styles/klokantech-basic/{z}/{x}/{y}.png'

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


////////////////////////////////////////////////////////////////////////////////////////////////////

function button(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

// router: L.Routing.graphHopper('eedc24b6-edb4-47cd-8363-5db303393a6c', {
//                             urlParameters: {
//                                 vehicle: 'foot'
//                             }
//                         }),



////////////////////////////////////////////////////////////////////////////////////////////////////
//'eedc24b6-edb4-47cd-8363-5db303393a6c'

var control = L.Routing.control({
    waypoints: [
      // L.latLng(44.91221, 7.671685),
      // L.latLng(44.907852, 7.673789)
    ],
    routeWhileDragging: true,
    show: true,
    language: 'de',
    geocoder: L.Control.Geocoder.nominatim(),

    router: L.Routing.graphHopper('' , {
        serviceUrl: 'http://localhost:8000/route',
        urlParameters: {        
            vehicle: 'foot',
        }
    }),  
}).addTo(map);



////////////////////////////////////////////////////////////////////////////////////////////////////


map.on('click', function (e) {
    var container = L.DomUtil.create('div'),
        startBtn = button('Start from this location', container),
        destBtn = button('Go to this location', container);

    L.DomEvent.on(startBtn, 'click', function () {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function () {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });

    L.popup().setContent(container).setLatLng(e.latlng).openOn(map);
});
