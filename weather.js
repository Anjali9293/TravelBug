const currentDay = moment().format('L');
var rapidAPIHeaders = {
    "x-rapidapi-host": "trueway-places.p.rapidapi.com",
    "x-rapidapi-key": "ee8fb8825dmsh08b2987afec24dbp1f4e01jsn86669005cf0d"
};
var WeatherAPIKey = "555f0f1cc17650cb7069ee6104be4ed1";
var userInput = document.getElementById("search-Input");
var searchButton = document.getElementById("searchButton");
var searchHistory = getSearchHistory();

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
    getweatherdata(searchHistory[searchHistory.length - 1]);
    searchHistory.forEach(createListItem);
}

function createListItem(cityName) {

    var node = document.createElement("li");
    node.setAttribute("class", "list-group-item");
    node.setAttribute("style", "word-wrap: break-word;");
    var textnode = document.createTextNode(cityName);
    node.appendChild(textnode);
    node.addEventListener("click", function() {
        handleSideBarOnClick(cityName);
    });
    document.querySelector(".cities").appendChild(node);
}

// Clear search history button
function clearSearch (){
    var clearBtn = $(`<button class="btn btn-info active" style="margin:auto; width:100%;">Clear All</button>`);
    $(clearBtn).click(function() {
        localStorage.clear();
        $("ul.cities li").remove();
    });
    clearBtn.appendTo(".cities");
}
clearSearch();


function handleSideBarOnClick(name) {
    getweatherdata(name);
}

function getweatherdata(name) {
    var forecastqueryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + name + "&APPID=" + WeatherAPIKey;
    $('.weather').empty();
    $.ajax({
            url: forecastqueryURL,
            method: "GET"
        })
        .then(function(response) {
            $('.city').text(response.city.name);
            getNearbyPlaces(response.city.coord.lat, response.city.coord.lon);
            console.log(response);
            for (var i = 0; i < 5; i++) {
                let forecastIndex = ((i + 1) * 8) - 3; // to get the midday index of each day
                let forecast = response.list[forecastIndex];
                let forecastDate = moment(currentDay, "L")
                    .add((i + 1), 'days')
                    .format('L');


                $(`
            <div class="col-weather-day">
                <div class="card portfolioCard">
                  <div>
                    <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" class="card-image" style="margin: 0 10px;">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">${forecastDate}</h5>
                    <p class="card-temp">Temperature:${forecast.main.temp}&#186 F</p>
                  </div>
                </div>
              </div>  
            `).appendTo('.weather');
            }

        });
}

function getNearbyPlaces(lat, lon) {
    $('.attractions').empty();
    $.ajax({
        "url": `https://trueway-places.p.rapidapi.com/FindPlacesNearby?type=tourist_attraction&radius=5000&language=en&location=${lat},${lon}`,
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": rapidAPIHeaders
    }).done(function(response) {
        console.log(response);
        const attractions = response.results;
        attractions.forEach(function(attraction) {
            $(`            
                <div class="col-sm-6">
                    <div class="card portfolioCard">
                        <div class="card-body">
                            <h5 class="card-title">${attraction.name}</h5>
                            <p class="card-text">Address: ${attraction.address}</p>
                            <p class="rating"> Phonenumber: ${attraction.phone_number || "N/A"}</p>
                            <p>Type: ${attraction.types.join(', ')}</p>
                            <a target="_new" href="${attraction.website}" class="target">Attraction Link</a>
                        </div>
                    </div>
                </div>
            `).appendTo('.attractions');
        })
    });
}


createSidebarFromHistory();

searchButton.addEventListener("click", searchCity);