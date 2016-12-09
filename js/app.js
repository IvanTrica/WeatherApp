function initialize() {
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load', initialize);
var unitCheck = 0;

function getWeatherData(name, dataRes, unit) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + name + "&cnt=7&units=" + unit + "&appid=4f1fa544ba4c3c3ba139be65a4c6fe45"
    }).done(function(data) {
        dataRes(data, unit);
    });
}

function dayInWeek(day) {
    var days = ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"];
    var d = day % 7;
    return days[d];
}


$(document).on('click', '#cTof ', function() {
    var city = [];
    var city = $('#cityName').text();
    city = city.replace(/\s/g, "");
    city = city.split(",");
    var name = city[0];
    var unit;
    if (unitCheck === 0) {
        unit = "imperial";
        unitCheck = 1;
    } else {
        unit = "metric";
        unitCheck = 0;
    }
    getWeatherData(name, dataRes, unit);
    if (unit === "imperial") {
        $('#cTof').text('Prikazi u Celzijusima');
    } else {
        $('#cTof').text('Prikazi u Farenhajtima');
    }

});



function dataRes(data, unit) {
    $('table').css('display', 'block');
    $('tbody').empty();
    var d = new Date().getDay();
    var cityName = $("<h2  class='text-center'>");
    var temp = ['C', 'F'];
    $('#cityName').text(data.city.name + ",  " + data.city.country);
    $('#currentTemp').text(data.list[0].temp.day);
    $('#toDayMin').text(data.list[0].temp.min);
    $('#toDayMax').text(data.list[0].temp.max);
    for (var i = 0; i < data.list.length; i++) {
        if (i === 0) {
            var forcast = $("<tr><td>Sutra</td><td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='vreme' /></td><td>" + data.list[i].temp.min + "<sup>  o</sup><span class='tempVal'></span></td><td>" + data.list[i].temp.max + "<sup>  o</sup><span class='tempVal'></span></td></tr>");
        } else {
            var forcast = $("<tr><td>" + dayInWeek(d + i) + "</td><td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='vreme' /></td><td>" + data.list[i].temp.min + "<sup>  o</sup><span class='tempVal'></span></td><td>" + data.list[i].temp.max + "<sup>  o</sup><span class='tempVal'></span></td></tr>");
        }


        $('tbody').append(forcast);
        if (unit === "metric") {
            $('.tempVal').text(temp[0]);
        } else {
            $('.tempVal').text(temp[1]);
        }

    }
}
$('#log').on('click', function() {
    var city = [];
    var input = $('#searchTextField').val();
    input = input.replace(/\s/g, "");
    city = input.split(",");
    var name = city[0];
    var unit = "metric";
    getWeatherData(name, dataRes, unit);
    $('#cTof').text('Prikazi u Farenhajtima');
});
