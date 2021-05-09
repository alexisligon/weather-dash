$('#search-button').on('click', function() {
    getCitySearch();
    var clearSearch = $('#search-input');
    clearSearch.text('');
}

//empty search input value
)

//seven day forecast
var sevenDays = 'https://api.openweathermap.org/data/2.5/onecall?lat=35.7721&lon=-78.6386&&units=imperial&exclude=current,minutely,hourly&appid=12ab451d86c37bd1bbaa8df17ff823aa'
//current weather
var cityWeather = 'https://api.openweathermap.org/data/2.5/weather?q=orlando&units=imperial&appid=12ab451d86c37bd1bbaa8df17ff823aa'

var cityArray = [];
checkLocalStorage();


function getCitySearch(citySearch) {

    var city = $('#search-input').val() || citySearch;
    var cityQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=12ab451d86c37bd1bbaa8df17ff823aa`;
    $("#main-weather").css("display", "block");
    $("#five-days").css("display", "block");



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

            $('#icon-space').attr('src', `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`)

            //5 day forecast
            for (let i = 0; i < data.daily.length; i++) {
                var day1 = moment.unix(data.daily[i].dt).format('L');
                $(`#icon-space${i + 1}`).attr('src', `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
                $(`#date${i + 1}`).text(day1);
                $(`#temp${i + 1}`).text(`Temperature: ${data.daily[i].temp.day}°F`);
                $(`#wind${i + 1}`).text(`Wind: ${data.daily[i].wind_speed} mph`);
                $(`#humidity${i + 1}`).text(`Humidity: ${data.daily[i].humidity}%`);
            }
            cityArray.push(city);
            localStorage.setItem('city', JSON.stringify(cityArray));


            var buttonList = $('#button-section')
            var cityButton = $('<li>');
            cityButton.text(city).addClass('btn btn-primary pastCitiesButton').attr('id', city);
            buttonList.append(cityButton);


        })
    })
}

$(document).on('click', '.pastCitiesButton', function() {
    console.log('button was clicked')
    var newSearch = $(`#${city}`);
    getCitySearch(newSearch);
    
    
    //get city from id on button pass through function
    //clear input after search
})
//function to check local storage for previous cities
function checkLocalStorage() {
    var previousCities = JSON.parse(localStorage.getItem('city'))
    if (previousCities === null) {
        return;
    } else {
        cityArray = previousCities;
        var buttonList = $('#button-section')
        for (i = 0; i < cityArray.length; i++) {
            var cityButton = $('<li>');
            cityButton.text(cityArray[i]).addClass('btn btn-primary pastCitiesButton');
            buttonList.append(cityButton);
        }
    }
}



//display current days date
var date = $('#date');

function displayDate() {
    var today = moment().format('L');
    date.text(today);
}
displayDate();