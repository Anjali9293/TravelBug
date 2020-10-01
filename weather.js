const currentDay = moment().format('L');
var apiKey = "e854039facmshf240de781c376e5p1fdb86jsn66c280925862";
var WeatherAPIKey = "555f0f1cc17650cb7069ee6104be4ed1";
var userInput = document.getElementById("search-Input");
var searchButton = document.getElementById("searchButton");
var searchHistory = getSearchHistory();
var card = {
    images: document.querySelectorAll(".card-image"),
	date: document.querySelectorAll(".card-title"),
	temp: document.querySelectorAll(".card-temp"),
	humidity: document.querySelectorAll(".card-Humidity")
}
var apiData
//This function is initiated by clicking the search button that takes user input.
function searchCity(event) {
    event.preventDefault();
    var input = userInput.value;
    if (!input || input == "") return;
    addToSearchHistory(input);
    createListItem(input);
    getweatherdata(input);
}

function addToSearchHistory(cityName) {
    searchHistory.push(cityName);
    localStorage.searchHistory = JSON.stringify(searchHistory);
}

function getSearchHistory() {
    return JSON.parse(localStorage.searchHistory || "[]");
}

function createSidebarFromHistory() {
    searchHistory.forEach(createListItem);
}

function createListItem(cityName) {
    var node = document.createElement("li");
    node.setAttribute("class", "list-group-item");
    var textnode = document.createTextNode(cityName);
    node.appendChild(textnode);
    node.addEventListener("click", function () {
		handleSideBarOnClick(cityName);
	});
    document.querySelector(".cities").appendChild(node);
}

function handleSideBarOnClick(name) {
	getweatherdata(name);
}

function getweatherdata(name) {
    var forecastqueryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + name + "&APPID=" + WeatherAPIKey;

    $.ajax({
        url: forecastqueryURL,
        method: "GET"
    })
    .then(function (response) {
        apiData = response
        for (var i = 0; i < card.date.length; i++) {
            let forecastIndex = ((i + 1) * 8) - 4;
            let forecast = response.list[forecastIndex];
            let imageUrl = "https://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png";
            let forecastDate = moment(currentDay, "L")
                .add((i + 1), 'days')
                .format('L');

            card.date[i].textContent = forecastDate;
            card.images[i].src = imageUrl;
            card.temp[i].textContent = "Temperature:"+forecast.main.temp;
            card.humidity[i].textContent = "Humidity:"+forecast.main.humidity;
        }

    });
}

createSidebarFromHistory();

searchButton.addEventListener("click", searchCity);