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
//current weather information
$.ajax({
    url: cityWeather,
    method: 'GET',
}).then(function (data) { 
    console.log(data);

    //variables for city weather data
    var latitude = data.coord.lat;
    var longitude = data.coord.lon;
    var cityName = data.name;
    var tempData = data.main.temp;
    var humidityData = data.main.humidity;
    var windData = data.wind.speed;

    //variables for inserting data into html display
    var cityDisplay = $('#city-name');
    var tempDisplay = $('#temp');
    var windDisplay = $('#wind');
    var humidityDisplay = $('#humidity');

    //grab the data and display
    cityDisplay.text(cityName);
    tempDisplay.text(`Temperature: ${tempData}°F`);
    windDisplay.text(`Wind Speed: ${windData} mph`);
    humidityDisplay.text(`Humidity: ${humidityData}%`);

    //query from searched city latitude and longitude data to display 5 day forecast
    //inserts the citys latitude and longitude into API
    var fiveDayQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=current,minutely,hourly&appid=12ab451d86c37bd1bbaa8df17ff823aa`
    $.ajax({
        url: fiveDayQuery,
        method: 'GET'
    }).then(function(data){
        //display first day weather forecast on first card in html
        var day0 = moment.unix(data.daily[0].dt).format('L');
        $('#date0').text(day0);
        $('#temp0').text(`Temperature: ${data.daily[0].temp.day}°F`);
        $('#wind0').text(`Wind: ${data.daily[0].wind_speed} mph`);
        $('#humidity0').text(`Humidity:${data.daily[0].humidity}%`);

        //second day on second card
        var day1 = moment.unix(data.daily[1].dt).format('L');
        $('#date1').text(day1);
        $('#temp1').text(`Temperature: ${data.daily[1].temp.day}°F`);
        $('#wind1').text(`Wind: ${data.daily[1].wind_speed} mph`);
        $('#humidity1').text(`Humidity:${data.daily[1].humidity}%`);
        
        var day2 = moment.unix(data.daily[2].dt).format('L');
        $('#date2').text(day2);
        $('#temp2').text(`Temperature: ${data.daily[2].temp.day}°F`);
        $('#wind2').text(`Wind: ${data.daily[2].wind_speed} mph`);
        $('#humidity2').text(`Humidity:${data.daily[2].humidity}%`);

        var day3 = moment.unix(data.daily[3].dt).format('L');
        $('#date3').text(day3);
        $('#temp3').text(`Temperature: ${data.daily[3].temp.day}°F`);
        $('#wind3').text(`Wind: ${data.daily[3].wind_speed} mph`);
        $('#humidity3').text(`Humidity:${data.daily[3].humidity}%`);

        var day4 = moment.unix(data.daily[4].dt).format('L');
        $('#date4').text(day4);
        $('#temp4').text(`Temperature: ${data.daily[4].temp.day}°F`);
        $('#wind4').text(`Wind: ${data.daily[4].wind_speed} mph`);
        $('#humidity4').text(`Humidity:${data.daily[4].humidity}%`);
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