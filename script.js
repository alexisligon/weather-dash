//PSEUDO CODE
//i need to create a card with a form to search for a city
//the search needs to fetch data from the weather api
//the display needs to include the name of the city, the date, an icon of the type of weather
//for example a sun or a cloud or rain or snow
// add weather icon
// the most recent city search needs to display as a clickable link to easily access the most

$('#search-button').on('click', getCitySearch)
// $('#search-button').addEventListener('submit', getCitySearch);

//seven day forecast
var sevenDays = 'https://api.openweathermap.org/data/2.5/onecall?lat=35.7721&lon=-78.6386&&units=imperial&exclude=current,minutely,hourly&appid=12ab451d86c37bd1bbaa8df17ff823aa'
//current weather
var cityWeather = 'https://api.openweathermap.org/data/2.5/weather?q=orlando&units=imperial&appid=12ab451d86c37bd1bbaa8df17ff823aa'

function getCitySearch() {
    var city = $('#search-input').val();
    var cityQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=12ab451d86c37bd1bbaa8df17ff823aa`;

    //current weather information
    $.ajax({
        url: cityQuery,
        method: 'GET',
    }).then(function (data) {
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
        }).then(function (data) {
            console.log('data!!!!!! ', data)
            console.log('testing')
            var whatisthis = data.daily[0].weather[0].icon
            console.log('what are you ', whatisthis)
            $('#icon-space').attr('src', `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`)
            //5 day forecast
            for (let i = 0; i < data.daily.length; i++) {
                var day1 = moment.unix(data.daily[i].dt).format('L');
                $(`#date${i + 1}`).text(day1);
                $(`#temp${i + 1}`).text(`Temperature: ${data.daily[i].temp.day}°F`);
                $(`#wind${i + 1}`).text(`Wind: ${data.daily[i].wind_speed} mph`);
                $(`#humidity${i + 1}`).text(`Humidity: ${data.daily[i].humidity}%`);
            }
        })
    })
}




//display current days date
var date = $('#date');

function displayDate() {
    var today = moment().format('L');
    date.text(today);
}
displayDate();