const APIkey = '871b3ff65e2c2af43749b9d344bcd5d5'
const savedSearches = document.getElementById('#savedSearches')

const searchButton = $('.searchButton')
let city;

const todayContainer = document.querySelector('#today')
const forecastContainer = document.querySelector('#forecast')
const body = document.body
// const stuff = dayjs.extend(window.dayjs_plugin_utc);
// const otherStuff = dayjs.extend(window.dayjs_plugin_timezone);

// Function to display the current weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather) {
    var date = dayjs().format('M/D/YYYY');
    // Store response data from our fetch request in variables
    var tempF = weather.main.temp;
    var windMph = weather.wind.speed;
    var humidity = weather.main.humidity;
    var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var iconDescription = weather.weather[0].description || weather[0].main;
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);
    heading.setAttribute('class', 'h3 card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');
    heading.textContent = `${city} (${date})`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', iconDescription);
    weatherIcon.setAttribute('class', 'weather-img');
    heading.append(weatherIcon);
    tempEl.textContent = `Temp: ${tempF}°F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    cardBody.append(heading, tempEl, windEl, humidityEl);
    todayContainer.innerHTML = '';
    todayContainer.append(card);

}
// add all elements for the 5 day forecast
// function renderForecast(city, weather) {
//     const days = dayjs.extend(window.dayjs_plugin_utc);
//     const otherDays = dayjs.extend(window.dayjs_plugin_timezone);
//     // Store response data from our fetch request in variables
// }

function renderItems(cityName, data) {
    renderCurrentWeather(cityName, data.list[0], data.city.timezone);
    // renderForecast(data.list);
}

function getApi(location) {
    var { lat } = location;
    var { lon } = location;
    // var city = location.name;
    var cityName = location.name;
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
    // console.log(location.lat)
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderItems(cityName, data)
            // console.log(data)

        });
}

function fetchCoords(city) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`;

    fetch(apiUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (!data[0]) {
                alert('Location not found');
            } else {
                // appendToHistory(searchButton);
                // console.log(data[0])
                getApi(data[0]);
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

// create function to fetch the 5 day forecast
function fetchFiveDay() {
    let cityName = location.name
    const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`;
    fetch(fiveDayURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // for (let i = 0; i < 5; i++);
            // renderForecast(data.list)
            console.log(data)
            // displayFiveDay(cityName, data)
        })
        .catch(function (err) {
            console.error(err)
        })
}

// function displayFiveDay(data) {
//     const fiveDay = data.weather[0];
//     let card = document.createElement('div')
//     const heading = document.createElement('h1')
//     heading.textContent = city.val;
//     forecastContainer.innerHTML = "";
//     forecastContainer.append(card)
// }




searchButton.click(function () {
    let currentSearchedCities =
        JSON.parse(localStorage.getItem('location')) || [];
    city = $('.userInput').val();

    currentSearchedCities.push(city);

    localStorage.setItem('location', JSON.stringify(currentSearchedCities));

    fetchCoords(city);
    fetchFiveDay(city);
});

function showSavedLocations() {

    // let searchedCities = JSON.parse(localStorage.getItem('location'));


    for (let i = 0; i < searchedCities.length; i++) {
        let saveButtons = document.createElement("button")
        saveButtons.innerHTML = searchedCities[i];
        saveButtons.append(forecastContainer);
    }

}

