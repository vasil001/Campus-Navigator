
$(document).ready(function(){

 $.ajaxSetup({ cache: false });
 $('#content-left #search').keyup(function(){
  $('#content-left #result').html('');
  $('#content-left #state').val('');
  var searchField = $('#content-left #search').val();
  var expression = new RegExp(searchField, "i");
  // "http://localhost:8888/wordpress/wp-content/plugins/projekt-plugin/bild.png"
  //'https://chinger-coorp.fb2.frankfurt-university.de/wordpress-test/wp-json/mao/v1/search?term=' 
  $.getJSON('https://chinger-coorp.fb2.frankfurt-university.de/wordpress-test/wp-json/mao/v1/search?term='  , function(data) {
    var items= []; 
    items.push(data);
    
    var arr;
    for (var i=0; i< items.length; i++){
    	arr = items[i].persons;
    	arr2 = items[i].rooms;

      console.log("Arr: ", arr);
      console.log("Arr rooms: ", arr2);

    	for (var j=0; j< arr.length; j++){
        	console.log("Gefunden: ", arr[j]);

        	for (var k=0; k< arr2.length; k++){
        		console.log("Room: ", arr2[k]);

        		if (searchField ==  arr[j].first_name || searchField == arr[j].last_name || searchField == arr[j].title || searchField == arr[j].id ) {
        			console.log("Yeah");


              $.getJSON('https://chinger-coorp.fb2.frankfurt-university.de/wordpress-test/wp-json/mao/v1/person/' + arr[j].id, function(data) {
                  var daten = [];
                  daten.push(data);

                  var myIcon = L.icon({
                  iconUrl: 'https://www.pinclipart.com/picdir/big/363-3639653_location-pin-transparent-location-logo-png-vector-clipart.png',
                  iconSize: [10, 24],
                  iconAnchor: [9, 21],
                  popupAnchor: [0, -14]
                })

                  for (var i=0; i< daten.length; i++){
                  console.log("Neue Daten: ", daten[i].officerooms);
                  var office = daten[i].officerooms;

                    for (var j=0; j< office.length; j++){
                    var long = office[j].long;
                    var lat = office[j].lat;

                    var build1 =L.marker( [long, lat], {icon: myIcon}).addTo(map);
                    //build1.bindPopup(value.location).openPopup();

                    }
                  }
              });

			        $('#content-left #result').append('<li class="list-group-item link-class"><img src="'+arr.image+'" height="40" width="40" class="img-thumbnail" /> '+arr[j].first_name + " " + arr[j].last_name + ' | <span class="text-muted">'+arr2[k].title+'</span></li>' + arr[j].id);
			        console.log("Name: ", arr[j].first_name);
			        console.log(arr);

        	}

 
    }
  }
    }
   });   
  });
 });
 
 $('#content-left #result').on('click', 'li', function() {
  var click_text = $(this).text().split('|');
  $('#content-left #search').val($.trim(click_text[0]));
  $("#content-left #result").html('');
 });

//});