var rapidAPIHeaders = {
    "x-rapidapi-host": "hotels4.p.rapidapi.com",
    "x-rapidapi-key": "bd4b60f585mshb932ee3918ef8d1p1f6ceajsn5f0b0da033ac"
};
var apiKey = "002d0ebbeamsh799a5b869925f5cp1155fcjsnb19952ec579f";
var userInput = document.getElementById("search-Input");
var searchButton = document.getElementById("searchButton");
var searchHistory = getSearchHistory();
var card = {
    hotelName: document.querySelectorAll(".card-title"),
    hotelAddress: document.querySelectorAll(".card-text"),
    hotelRating: document.querySelectorAll(".rating"),
    hotelLink: document.querySelectorAll(".link")
}
//This function is initiated by clicking the search button that takes user input.
function searchCity(event) {
    event.preventDefault();
    var input = userInput.value;
    if (!input || input == "") return;
    addToSearchHistory(input);
    createListItem(input);
    getHotelData(input);
}
//This function pushes user inputs to serachhistory and add them to the local storage
function addToSearchHistory(cityName) {
    searchHistory.push(cityName);
    localStorage.searchHistory = JSON.stringify(searchHistory);
}
//This function returns an object stored in local storage
function getSearchHistory() {
    return JSON.parse(localStorage.searchHistory || "[]");
}
//This function goes through an array of strings in local storage and calls createrlistItem function
function createSidebarFromHistory() {
    searchHistory.forEach(createListItem);
}
//This function creates a li element in HTMl and appends it to cities ul tag
function createListItem(cityName) {
    var node = document.createElement("li");
    node.setAttribute("class", "list-group-item");
    var textnode = document.createTextNode(cityName);
    node.appendChild(textnode);
    document.querySelector(".cities").appendChild(node);
}

function getHotelData(city) {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + city,
        "method": "GET",
        "headers": rapidAPIHeaders
    }).done(function(response) {
        console.log(response);
        for (var i = 0; i < card.hotelName.length; i++) {
            let hotel = response.suggestions[3];
            console.log(hotel);

            card.hotelName[i].textContent = hotel.entities[i].name;

        }

    });
}

createSidebarFromHistory();

searchButton.addEventListener("click", searchCity);