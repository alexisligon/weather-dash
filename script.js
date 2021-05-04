//PSEUDO CODE
//i need to create a card with a form to search for a city
//the search needs to fetch data from the weather api
//the data needs to be displayed on the side of the page
//the display needs to include the name of the city, the date, an icon of the type of weather
//for example a sun or a cloud or rain or snow
//temp, wind, humidity, uv index
//display the 5 day forecast
// each day forecast has the date, a weather icon, temp, wind, and humidity
// the most recent city search needs to display as a clickable link to easily access the most
//recently searched weather
var weather = 'http://api.openweathermap.org/data/2.5/weather?q=Raleigh&units=imperial&APPID=2cd8c8262bad3d97fbc4eedd4e5664c4';
var temp = $('#temp');
var wind = $('#wind');
var humidity = $('#humidity');
//single day weather forecast
fetch (weather)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log('data: ', data);
    console.log('name: ', data.name);
    console.log('main', data.main);
   console.log('temp: ', data.main.temp, 'degrees??');
   console.log('wind: ', data.wind.speed, 'mph')
   console.log('humidity: ', data.main.humidity, '%');
})

//5 day weather forecast
fetch ('http://api.openweathermap.org/data/2.5/find?q=Raleigh&units=imperial&appid=12ab451d86c37bd1bbaa8df17ff823aa')
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log('data: ', data);
    
})

var date = $('#date');

function displayDate() {
    var today = moment().format('L');
    date.text(today);
}

displayDate();

