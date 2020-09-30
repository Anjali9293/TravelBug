var apiKey = "002d0ebbeamsh799a5b869925f5cp1155fcjsnb19952ec579f";

var userInput = document.getElementById("search-Input");
var searchButton = document.getElementById("searchButton");
var firstInput =document.getElementById("firstIntput");

searchButton.addEventListener("click",searchCity);

function searchCity(event){
  event.preventDefault();
  var input = userInput.value;
  console.log(input); 

  localStorage.input = input;

  firstInput.textContent=localStorage.input;

  
}

// function weatherPage(){

// }