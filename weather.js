
var apiKey = "002d0ebbeamsh799a5b869925f5cp1155fcjsnb19952ec579f";
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
    document.querySelector(".cities").appendChild(node);
}

createSidebarFromHistory();

searchButton.addEventListener("click", searchCity);