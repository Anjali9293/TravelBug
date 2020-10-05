var userInput = $("#search-Input");
var searchButton = $(".search-button");
var searchHistory = getSearchHistory();

//This function is initiated by clicking the search button that takes user input.
function searchCity(event) {
    event.preventDefault(); 
    var input = userInput.val();
    if (!input || input == "") return;
    addToSearchHistory(input);
    window.location = "weather.html";
}

function addToSearchHistory(cityName) {
    searchHistory.push(cityName);
    localStorage.searchHistory = JSON.stringify(searchHistory);
}

function getSearchHistory() {
    return JSON.parse(localStorage.searchHistory || "[]");
}

searchButton.click(searchCity);