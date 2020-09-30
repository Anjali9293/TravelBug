var apiKey = "002d0ebbeamsh799a5b869925f5cp1155fcjsnb19952ec579f";
var userInput = document.getElementById("search-Input");
var searchButton = document.getElementById("searchButton");
var searchHistory = JSON.parse(localStorage.searchHistory || "[]");
searchButton.addEventListener("click",searchCity);

function searchCity(event){
  event.preventDefault();
  var input = userInput.value;
  if(!input || input == "") return;
  console.log(input); 
  searchHistory.push(input)
  localStorage.searchHistory = JSON.stringify(searchHistory);

  var node = document.createElement("li");
  node.setAttribute("class", "list-group-item");
//   var textnode = document.createTextNode(City);
//   node.appendChild(textnode);
  document.querySelector(".cities").appendChild(node);

  node.textContent=input;

  
}

function createSidebarFromHistory() {
	searchHistory.forEach(function (cityName, i) {
		var node = document.createElement("li");
		node.setAttribute("class", "list-group-item");
		var textnode = document.createTextNode(cityName);
		node.appendChild(textnode);
		document.querySelector(".cities")
			.appendChild(node);
	});
}
createSidebarFromHistory();
// function weatherPage(){

// }