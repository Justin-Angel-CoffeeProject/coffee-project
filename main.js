"use strict"

let delay = 3000; // delay time in milliseconds
let timeoutId = setTimeout(function () {
    // alert('Welcome to Coffee!');
    let loading = document.getElementById("loading");
    loading.className = "d-none";
    let mainPage = document.getElementById("main-page");
    mainPage.className = "d-block container text-center";
}, delay);

// to cancel the timeout, you can call
// clearTimeout(timeoutId);
// prior to the delay expiring

// builds HTML structure of coffee element
function renderCoffee(coffee) {
    let html = '<div class="coffee row">';
    html += '<h4 class="col">' + coffee.name + '</h4>';
    html += '<p class="col">' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

// calls renderCoffee on all coffees[] elements
function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// updates coffee list based on roast selection
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];

    if(selectedRoast === "all"){
        tbody.innerHTML = renderCoffees(coffees);
        return;
    }

    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// updates coffee list based on name search
function searchCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data

    let searchName = coffeeSearch.value;
    let filteredCoffees = [];

    if (searchName === "") {
        tbody.innerHTML = renderCoffees(coffees);
        return;
    }

    searchName = searchName.toLowerCase();

    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase() === searchName) { // matches completely
            filteredCoffees.push(coffee);
        }

        if (coffee.name.toLowerCase().startsWith(searchName)) { // partial match
            filteredCoffees.push(coffee);
        }
    });

    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// function addCoffee(e){
//     e.preventDefault();
//
//     let currentName = newName.value;
//     let currentRoast = newRoast.value;
//     console.log(currentName + " " + currentRoast);
//
//     let newCoffee = document.createElement()
// }

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// DOM elements
let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let coffeeSearch = document.querySelector('#search-field')
let newRoast = document.getElementById("adding-roast-selection");
let newName = document.getElementById("add-coffee-name");
let addButton = document.getElementById("add-coffee-btn");

tbody.innerHTML = renderCoffees(coffees); // initial render of all coffees

// DOM events
roastSelection.addEventListener('change', updateCoffees);
coffeeSearch.addEventListener('keyup', searchCoffees);
addButton.addEventListener('click', addCoffee);