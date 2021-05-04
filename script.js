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
var jaxWeather = 'http://api.openweathermap.org/data/2.5/weather?q=Jacksonville,FLuk&APPID=2cd8c8262bad3d97fbc4eedd4e5664c4';

fetch (jaxWeather)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
    console.log('name: ', data.name);
    console.log('main', data.main);
   console.log('temp: ', data.main.temp, 'degrees??');
   console.log('wind: ', data.wind.speed, 'mph')
   console.log('humidity: ', data.main.humidity, '%');
})

