
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



createSidebarFromHistory();

searchButton.addEventListener("click", searchCity);