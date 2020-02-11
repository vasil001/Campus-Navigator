

$(document).ready(function(){

 $.ajaxSetup({ cache: false });
 $('#content-left #search').keyup(function(){
  $('#content-left #result').html('');
  $('#content-left #state').val('');
  var searchField = $('#content-left #search').val();
  var expression = new RegExp(searchField, "i");
  $.getJSON('http://localhost:8888/wordpress/wp-content/plugins/projekt-plugin/assets/search/data.json', function(data) {
   $.each(data, function(key, value){
    console.log(searchField);


    if (value.name.search(expression) != -1 || value.location.search(expression) != -1)
    {
     $('#content-left #result').append('<li class="list-group-item link-class"><img src="'+value.image+'" height="40" width="40" class="img-thumbnail" /> '+value.name+' | <span class="text-muted">'+value.location+'</span></li>');
        console.log(value.name);
        console.log(value);

        var myIcon = L.icon({
          iconUrl: 'https://www.pinclipart.com/picdir/big/363-3639653_location-pin-transparent-location-logo-png-vector-clipart.png',
          iconSize: [10, 24],
          iconAnchor: [9, 21],
          popupAnchor: [0, -14]
        })

         var build1 =L.marker( [value.lat, value.lng], {icon: myIcon}).addTo(map);
         build1.bindPopup(value.location).openPopup();
         map.setView([value.lat, value.lng], 18);
 }  

    });   
   });
 });
 
 $('#content-left #result').on('click', 'li', function() {
  var click_text = $(this).text().split('|');
  $('#content-left #search').val($.trim(click_text[0]));
  $("#content-left #result").html('');
 });

});