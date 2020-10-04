var rapidAPIHeaders = {
    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key": "ee8fb8825dmsh08b2987afec24dbp1f4e01jsn86669005cf0d"
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
    getHotelData(searchHistory[searchHistory.length-1]); // auto load the last search history
    searchHistory.forEach(createListItem);
}
//This function creates a li element in HTMl and appends it to cities ul tag
function createListItem(cityName) {
    var node = document.createElement("li");
    node.setAttribute("class", "list-group-item");
    node.setAttribute("style", "word-wrap: break-word;")
    var textnode = document.createTextNode(cityName);
    node.appendChild(textnode);
    node.addEventListener("click", function () {
        handleSideBarOnClick(cityName);
    });
    document.querySelector(".cities").appendChild(node);
}

function clearAll (){
    var clearBtn = document.createElement("button");
    clearBtn.setAttribute("class", "btn btn-info active");
    clearBtn.setAttribute("style", "margin: auto; width: 100%;");
    clearBtn.setAttribute("id", "clear");
    clearBtn.innerHTML = "Clear All";
    document.querySelector(".cities").appendChild(clearBtn);
    clearBtn.addEventListener("click", function() {
        var bye = localStorage.clear();
        var emptyList = $("ul.cities li").not("#clear").remove();
    });
}
clearAll();

function handleSideBarOnClick(name) {
	getHotelData(name);
}

function getHotelData(city) {
    $('.hotels').empty();
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + city,
        "method": "GET",
        "headers": rapidAPIHeaders
    }).done(function(response) {
        let hotels = response.data.filter(function(obj) {
            return obj.result_type == "lodging";
        }) 
        $('.city').text(hotels[0].result_object.address_obj.city);
        hotels.forEach(function(hotel) {
            const details = hotel.result_object;
            const review = hotel.review_snippet.snippet;
            console.log(details);
            $(`            
                <div class="col-sm-5">
                    <div class="card portfolioCard">
                        <img src="${details.photo.images.medium.url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${details.name}</h5>
                            <p class="card-text">Hotel Address: ${details.address}</p>
                            <p class="rating"> Star Rating: ${details.rating}</p>
                            <p>Top Review: ${review}</p>
                            <a target="_new" href="https://www.google.com/travel/hotels/${details.address_obj.city}?q=${details.name}+${details.address_obj.street1}" class="target">Hotel Link</a>
                        </div>
                    </div>
                </div>
            `).appendTo('.hotels');
        })
    });
}

createSidebarFromHistory();

searchButton.addEventListener("click", searchCity);