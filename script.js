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
var currentWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=35.7721&lon=-78.6386&&units=imperial&exclude=current,minutely,hourly&appid=12ab451d86c37bd1bbaa8df17ff823aa'
var cityWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Raleigh&units=imperial&appid=12ab451d86c37bd1bbaa8df17ff823aa'

$.ajax({
    url: cityWeather,
    method: 'GET',
}).then(function (data) { 
    console.log(data);
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
    console.log('temp: ', temp);
    console.log('humidity: ', humidity);

    var fiveDayQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=current,minutely,hourly&appid=12ab451d86c37bd1bbaa8df17ff823aa`
    $.ajax({
        url: fiveDayQuery,
        method: 'GET'
    }).then(function(data){
        console.log(data);
        for (let i = 0; i < data.daily.length; i++) {
            var index = data.daily[i];
            console.log('temp: ', index.temp.day);
            console.log('wind: ', index.wind_speed);
            console.log('humidity, ', index.humidity);
            console.log('date: ', day);

            var day = moment.unix(index.dt).format('L');
            console.log(day);
            
        }
        
    })
 })

//display current days date
var date = $('#date');

function displayDate() {
    var today = moment().format('L');
    date.text(today);

    //add 1 day for 5 day forecast
    // var tomorrow = moment().add(1, 'days').format('L');
    // console.log(tomorrow);
}

displayDate();