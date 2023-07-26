
function displayWeatherInfo(city) {
    var APIKey = "06049584939bfdb947b35800e5407bab";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var iconcode = response.list[0].weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $(".weather-icon").attr("src", iconURL);
        var tempC = Math.floor(response.list[0].main.temp - 273.15);
        var wind = response.list[0].wind.speed;
        var humidity = response.list[0].main.humidity;


    //append the data to web application
    $("#temperature").text("Temp: " + tempC + "°C")
    $("#wind").text("Wind Speed: " + wind + "MPH")
    $("#humidity").text("Humidity: " + humidity + "%")


    }
    )
}

