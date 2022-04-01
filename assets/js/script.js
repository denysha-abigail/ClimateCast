var currentContainer = document.getElementById("current-data");
var cityTitle = document.getElementById("city-title");

const date = new Date();
const month = date.getMonth()+1;
const day = date.getDate();
const year = date.getFullYear();
const fullYear = " " + "(" + month + "/" + day + "/" + year + ")";

document.querySelector('button').addEventListener('click', handleClick);

function handleClick() {
    let city = document.getElementById('city').value.trim();
    if (city) {
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`
        fetch(url)
            .then(data => data.json())
            .then(data => {
                const { lat, lon, name } = data[0];
                cityTitle.innerHTML = 
                    `<h3 class="current-city">${name + fullYear}</h3>`
                let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`
                fetch(url2)
                    .then(data => data.json())
                    .then(data => {
                        const { temp, wind_speed, humidity, uvi } = data.current;
                        currentContainer.innerHTML =
                            `<div class="current-data">
                                <div>Temp: ${temp}°F</div>
                            </div>
                            <div class="current-data">
                                <div>Wind: ${wind_speed}</div>
                            </div>
                            <div class="current-data">
                                <div>Humidity: ${humidity}%</div>
                            </div>
                            <div class="current-data">
                                <div>UV Index: ${uvi}</div>
                            </div>`;

                            
                    }
            )})
    } else if (!city) {
        alert("Please enter a city.");
    }
};
