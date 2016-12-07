function initialize() {
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load', initialize);

function getWeatherData(name, dataRes) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + name + "&cnt=7&units=metric&appid=3fe5f569fd357233ae6167d2ccc34098"
    }).done(function (data) {
        dataRes(data);
    });
}
function dayInWeek(day){
    var days = ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"];
    var d = day%7;
    return days[d];
    
    
}
function dataRes(data) {
     $('tbody').empty();
    
    var d = new Date().getDay();
    var cityName = $("<h2  class='text-center'>");
    
    var temp = ['C', 'F'];
    $('#cTof').text('Prikazi u farenhajtima');
    $('.tempVal').text(temp[0]);
    
    $('#cityName').text(data.city.name + ",  " + data.city.country);
    $('#currentTemp').text(data.list[0].temp.day);
    $('#toDayMin').text(data.list[0].temp.min);
    $('#toDayMax').text(data.list[0].temp.max);
    for(var i = 0; i < data.list.length; i++){
        if(i === 0){
            var forcast = $("<tr><td>Sutra</td><td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='vreme' /></td><td>" + data.list[i].temp.min + "<sup>  o</sup><span class='tempVal'></span></td><td>" + data.list[i].temp.max + "<sup>  o</sup><span class='tempVal'></span></td></tr>");
        }else{
            var forcast = $("<tr><td>"+ dayInWeek(d+i) +"</td><td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='vreme' /></td><td>" + data.list[i].temp.min + "<sup>  o</sup><span class='tempVal'></span></td><td>" + data.list[i].temp.max + "<sup>  o</sup><span class='tempVal'></span></td></tr>");
}
        
        
        $('tbody').append(forcast);
        $('.tempVal').text(temp[0])

    }
  //  $('#toDayMax').append(span);
    
    console.log(data);
    console.log(data.list[0].temp.day);
}
$('#log').on('click', function () {
    $('table').css('display','block');
    var city = [];
    var input = $('#searchTextField').val();
    input = input.replace(/\s/g, "");
    city = input.split(",");
    var name = city[0];
    getWeatherData(name, dataRes);
})