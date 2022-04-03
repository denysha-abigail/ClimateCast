var currentContainer = document.getElementById("current-data");
var cityTitle = document.getElementById("city-title");
var forecastDays = document.getElementById("forecast-data");

// set search history to empty array
var searchHistory = [];

// set current date
const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
const fullYear = " " + "(" + month + "/" + day + "/" + year + ")";

// add click event listener to call search button and run handleClick function
document.querySelector('button').addEventListener('click', handleClick);

// get city input from user
function handleClick() {
    let city = document.getElementById('city').value.trim();
    if (city) {
        fetchData(city);
    } else if (!city) {
        alert("Please enter a city.");
        return;
    }

    // set localStorage
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    };

    localStorage.setItem("City", JSON.stringify(searchHistory));
};

// fetch lat and lon from city input
function fetchData(city) {
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`
    fetch(url)
        .then(data => data.json())
        .then(data => {
            const { lat, lon, name } = data[0];
        
            // fetch weather conditions from lat and lon data
            let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`
            fetch(url2)
                .then(data => data.json())
                .then(data => {
                    const { temp, wind_speed, humidity, uvi } = data.current;
                    const { icon, description } = data.current.weather[0];

                    // change uvi div class name to change colors based on favorable, moderate, and severe value ranges
                    var uviBlock = "";
                    if (uvi >= 11) {
                        uviBlock = "extreme";
                    } else if (uvi >= 8 && uvi <= 10.99) {
                        uviBlock = "very-high";
                    } else if (uvi >= 6 && uvi <= 7.99) {
                        uviBlock = "high";
                    } else if (uvi >= 3 && uvi <= 5.99) {
                        uviBlock = "moderate";
                    } else if (uvi <= 2.99) {
                        uviBlock = "low";
                    } 

                    // append city title to HTML
                    cityTitle.innerHTML =
                    `<h3>${name + fullYear}<img src="https://openweathermap.org/img/wn/${icon}.png"></h3>`

                    // append current weather to HTML
                    currentContainer.innerHTML =
                        `<div>
                            <div>Weather Conditions: <span class="text-capitalize">${description}</span></div>
                            <div>Temp: ${temp}°F</div>
                            <div>Wind: ${wind_speed}mph</div>
                            <div>Humidity: ${humidity}%</div>
                            <div>UV Index: <span class="${uviBlock}">${uvi}<span></div>
                        </div>`;

                    // loop through daily forecast
                    for (var i = 1; i <= 5; i++) {
                        var weatherData = {
                            date: data.daily[i].dt,
                            temp: data.daily[i].temp.day,
                            wind_speed: data.daily[i].wind_speed,
                            humidity: data.daily[i].humidity,
                            icon: data.daily[i].weather[0].icon,
                            description: data.daily[i].weather[0].description
                        };
                        
                        // add forecast-data div class based on icon to reflect weather conditions
                        var iconBlock = "";
                
                        if (weatherData.icon == "01d" || weatherData.icon == "01n") {
                            iconBlock = "clear";
                        } else if (weatherData.icon == "02d" || weatherData.icon == "02n" || weatherData.icon == "03d" || weatherData.icon == "03n" || weatherData.icon == "04d" || weatherData.icon == "04n") {
                            iconBlock = "clouds";
                        } else if (weatherData.icon == "09d" || weatherData.icon == "09n" || weatherData.icon == "10d" || weatherData.icon == "10n") {
                            iconBlock = "rain";
                        } else if (weatherData.icon == "11d" || weatherData.icon == "11n") {
                            iconBlock = "thunderstorm";
                        } else if (weatherData.icon == "13d" || weatherData.icon == "13n") {
                            iconBlock = "snow";
                        } else if (weatherData.icon == "50d" || weatherData.icon == "50n") {
                            iconBlock = "atmosphere";
                        }

                        // format current date for each forecast div
                        var currentDate = moment.unix(weatherData.date).format("MM/DD/YYYY");

                        // append 5-day forecast to HTML
                        document.getElementById("forecast-data-" + i).innerHTML =
                            `<div class="card-body">
                                    <h4 class="card-title">${currentDate}</h4>
                                    <img src="https://openweathermap.org/img/wn/${weatherData.icon}.png">
                                    <div>Weather Conditions: <span class="${iconBlock} text-capitalize">${weatherData.description}</span></div>
                                    <div>Temp: ${weatherData.temp}°F</div>
                                    <div>Wind: ${weatherData.wind_speed}mph</div>
                                    <div">Humidity: ${weatherData.humidity}%</div>
                                </div>`;
                    }
                })
        })
    // add catch function in the event of an error
    // add catch function in the event of an error
    // add catch function in the event of an error
    // add catch function in the event of an error
    // add catch function in the event of an error
    // add catch function in the event of an error
    // add catch function in the event of an error
    // add catch function in the event of an error
};

// load data function for when user refreshes page
function loadData() {

    // get localStorage
    var searchHistoryList = JSON.parse(localStorage.getItem("City"));
    var searchHistoryBtn = document.getElementById("search-history");

    document.querySelector("#search-history").addEventListener("click", (event) => {
        var citySearch = document.getElementById("search-history").innerHTML;
        fetchData(citySearch);
    });

    if (!searchHistoryList) {
        searchHistoryBtn.innerText = "";
    } else {
        searchHistoryBtn.innerText = `${searchHistoryList[0]}`;
    }
};

loadData();
