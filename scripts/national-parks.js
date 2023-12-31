"use strict"

// Helps with the length of the list of options(from select form) when it's visible
window.addEventListener("resize", addNationalParkName)

document.addEventListener("DOMContentLoaded", () => {
    
    addData();
    displayParks(nationalParksArray);

    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchButtonClicked);

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetButtonClicked);

    const viewAllParksBox = document.getElementById("viewAllParks");
    viewAllParksBox.addEventListener("click", viewAllParksAndSelectPark);

    const selectParkName = document.getElementById("selectParkName");
    selectParkName.addEventListener("click", viewAllParksAndSelectPark);

    const arrow = document.getElementById("arrow");
    document.addEventListener("scroll", whenUserScrolled);
    arrow.addEventListener("click", goToTop);

})

// Function responsible for getting all the inputted data
function getInput() {
    const input = {};
    input.parkName = document.getElementById("selectParkName");
    input.location = document.getElementById("selectLocation");
    // this targets the form-check for each checkbox and label
    input.allCheckboxesContainer = document.getElementById("checkbox-container").children;
    input.checkedLocationTypes = isLocationTypeChecked(input.allCheckboxesContainer);
    input.viewAllParks = document.getElementById("viewAllParks");
    input.searchButton = document.getElementById("searchButton");

    return input;
}

function resetButtonClicked() {
    const input = getInput();

    input.parkName.value = "0";
    input.parkName.disabled = false;
    input.location.value = "0";
    input.location.disabled = false;
    input.searchButton.disabled = false;
    for(let child of input.allCheckboxesContainer){
        document.getElementById(child.children[0].id).checked = false;
        child.children[0].disabled = false;
    }
    input.viewAllParks.checked = false;

    displayParks(nationalParksArray);
}

function searchButtonClicked(){
    const input = getInput();

    // this filter only by location
    if(input.location != "0") {
        const filteredByLocation = filterByLocation();
        if(input.checkedLocationTypes == 0) displayParks(filteredByLocation);
        else filterParksByLocationType();       
    }
    else if(input.checkedLocationTypes != 0) filterParksByLocationType();

}

// Function fires when there are changes in select form "Select National Park Name" and checkbox "View All National Parks"
function viewAllParksAndSelectPark() {
    const input = getInput();
    if(input.viewAllParks.checked  == true) {
        input.parkName.disabled = true;
        input.location.disabled = true;
        input.searchButton.disabled = true;
        for(let child of input.allCheckboxesContainer){
            child.children[0].disabled = true
        }
        displayParks(nationalParksArray);
    }
    else if(input.parkName.value != "0" && input.parkName.disabled == false) {
        input.location.value = "0";
        input.location.disabled = true;
        input.searchButton.disabled = true;
        for(let child of input.allCheckboxesContainer){
            document.getElementById(child.children[0].id).checked = false;
            child.children[0].disabled = true
        }
        filterParkName(input.parkName.value);
    }
    else enableThis(input);
}

function filterParkName(selectedParkName) {
    let parkDetails = nationalParksArray.filter(a => a.LocationName == selectedParkName);
    displayParks(parkDetails);
}

function filterByLocation() {
    const input = getInput();
    return nationalParksArray.filter(a => a.State == input.location.value);
}

function filterParksByLocationType() {
    const input = getInput();
    const filteredByLocation = filterByLocation();
    let currentParkArray = [];

    if(filteredByLocation != 0) currentParkArray = filteredByLocation;
    else currentParkArray = nationalParksArray;

    let filteredParks = [];  
    currentParkArray.forEach(park => {
        input.checkedLocationTypes.forEach(locationType => {
            if(park.LocationName.search(locationType) != -1)
            {
                if(filteredParks.length == 0 ) filteredParks.push(park);
                else {
                    let test = filteredParks.find(filteredPark => filteredPark.LocationName == park.LocationName) 
                    if(test == undefined) filteredParks.push(park);
                }
            }
        });
    });

    displayParks(filteredParks);
    
}

// Function to check which of the checkboxes are checked and to store only one word per each options like "Park" from "National Park" (used for verifying later)
function isLocationTypeChecked(allCheckboxesContainer) {
    let checked = [];

    for(let child of allCheckboxesContainer) {
        if(document.getElementById(child.children[0].id).checked) checked.push(child.children[1].innerText)
    }

    for(let i = 0; i < checked.length; i++ ) {
        const space = checked[i].indexOf(" ");

        switch(checked[i].substring(0, space)) {
            case "National":
                checked[i] = checked[i].substring(space + 1);
                break;
            case "Recreation":
                checked[i] = checked[i].substring(0, space);
                break;
            case "Scenic":
                checked[i] = checked[i].substring(0, space);
                break;
        }
    }

    return checked; 
}

// Function responsible for returning back the disabled parts to being enabled
function enableThis(input) {
    input.parkName.disabled = false;
    input.location.disabled = false;
    input.searchButton.disabled = false;
    for(let child of input.allCheckboxesContainer){
        child.children[0].disabled = false
    }
    
    if(input.parkName.value != "0") {
        viewAllParksAndSelectPark();
        return;
    }
    if(input.location.value != "0") {
        searchButtonClicked();
        return;
    }
    else if(input.checkedLocationTypes != 0) 
    {
        searchButtonClicked();
        return;
    }
    else displayParks(nationalParksArray);
}


// The following two functions are for the arrow image/button for a faster way of scrolling up
function whenUserScrolled() {
    const arrow = document.getElementById("arrow");
    if(document.body.scrollTop > 950 || document.documentElement.scrollTop > 950) {
        arrow.style.display = "block";
    }
    else arrow.style.display = "none";
}

function goToTop() {
    document.body.scrollTop = 0 // for Safari
    document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}


// Section for all Data functions and displaying it

// Adding data into select and checkbox forms 
function addData() {
    addNationalParkName();
    addLocations(locationsArray);
    addLocationCheckbox(parkTypesArray);
    
    function addLocations(locations) {
        const selectContainer = document.getElementById("selectLocation");
    
            for(let state of locations) {
                const option = new Option(state, state);
                selectContainer.appendChild(option);
            }
    }
    
    function addLocationCheckbox(parkTypes) {
        const allCheckboxesContainer = document.getElementById("checkbox-container");
    
        parkTypes.forEach(parkType => {
            const  checkboxContainer = document.createElement("div");
            checkboxContainer.classList.add("form-check")
        
                const input = document.createElement("input");
                input.type = "checkbox";
                    // to assign unique id with each, I used the value itself and removed the space between the words
                    let inputId = parkType.replace(/\s/g, '');
                input.id = inputId;
                input.classList.add("form-check-input");
    
                const label = document.createElement("label");
                label.setAttribute("for", inputId);
                label.classList.add("form-check-label");
                label.innerText = parkType;
    
                checkboxContainer.appendChild(input);
                checkboxContainer.appendChild(label);
    
            allCheckboxesContainer.appendChild(checkboxContainer);
        })
    }
}
    // Had to separate it from the function addData because it has to be called by resize window.addEventListener
    function addNationalParkName() { 
        const parks = nationalParksArray;
        const selectContainer = document.getElementById("selectParkName");
        if(selectContainer.children.length > 0) {
            const temp = selectContainer.children[0];
            selectContainer.innerText = "";
            selectContainer.appendChild(temp);
        }

            for(let park of parks) {
                const option = new Option(park.LocationName, park.LocationName);
                option.title = park.LocationName;
                let trimMultiplier = 9;
                let lengthToShortenTo = Math.round(parseInt(selectContainer.clientWidth, 10) / trimMultiplier);
                if(option.value.length > lengthToShortenTo) {
                    option.innerText = option.value.substring(0, lengthToShortenTo) + "...";
                }
                selectContainer.appendChild(option);
            }
    }

// Main container for the whole output
function displayParks(parks) {
    const input = getInput();
    const mainContainer = document.getElementById("display-parks-content");
    mainContainer.innerText = "";

    parks.forEach(park => {
        displayPark(park, mainContainer);
    });

    const results = document.getElementById("results");
    results.innerText = parks.length;
    
    const alertMessage = document.getElementById("alert-message");
    if(parks.length == 0) {
        alertMessage.hidden = false;
        const state = document.getElementById("state");
        state.innerText = input.location.value;
    }
    else alertMessage.hidden = true;
}

// For each park
function displayPark(park, parentContainer) {
    const eachParkContainerDiv = document.createElement("div");
    eachParkContainerDiv.classList.add("each-park");
    parentContainer.appendChild(eachParkContainerDiv);

    displayDetails(park, eachParkContainerDiv);
}

    function displayDetails(park, parentDiv) {
        const parkNameH4 = document.createElement("h4");
        parkNameH4.innerText = park.LocationName;
        parentDiv.appendChild(parkNameH4);

        getAddress(park, parentDiv);
        getPhoneFaxNumber(park, parentDiv);
        getVisit(park, parentDiv);

        const dividerHr = document.createElement("hr");
        dividerHr.classList.add("hrJS");
        parentDiv.appendChild(dividerHr);
    }

    function getAddress(park, parentDiv) {  
        const addressP = document.createElement("p"); 
            const addressSpan = document.createElement("span");
            addressSpan.innerText = "Address: ";
            addressSpan.classList.add("fw-medium");
        addressP.appendChild(addressSpan);

            // Checks if the key in the current park has a 0 value or not
            let address = "";
            for(const key in park) {
                if(key == "Address" || key == "City")
                {
                    if(park[key] != 0) address += `${park[key]}, `;
                }
                else if (key == "State") address += `${park[key]} `;
                else if (key == "ZipCode") 
                {
                    if(park[key] != 0) address += `${park[key]} `;
                } 
            }
        addressSpan.insertAdjacentText("afterend", address);
        parentDiv.appendChild(addressP);
    }

    function getPhoneFaxNumber(park, parentDiv) {
        if (park.Phone != 0) {
            const phoneNumberP = document.createElement("p");
                const phoneNumberSpan = document.createElement("span");
                phoneNumberSpan.innerText = "Phone Number: ";
                phoneNumberSpan.classList.add("fw-medium");
            phoneNumberP.appendChild(phoneNumberSpan);
            phoneNumberSpan.insertAdjacentText("afterend", park.Phone);
            parentDiv.appendChild(phoneNumberP);
        }
    
        if (park.Fax != 0) {
            const faxNumberP = document.createElement("p");
                const faxNumberSpan = document.createElement("span");
                faxNumberSpan.innerText = "Fax Number: ";
                faxNumberSpan.classList.add("fw-medium");
            faxNumberP.appendChild(faxNumberSpan);
            faxNumberSpan.insertAdjacentText("afterend", park.Fax);
            parentDiv.appendChild(faxNumberP);
        }
    }

    function getVisit(park, parentDiv) {
        if (park.Visit != undefined) {
            const visitP = document.createElement("p");
                const visitSpan = document.createElement("span");
                visitSpan.innerText = "Visit: ";
                visitSpan.classList.add("fw-medium");
            visitP.appendChild(visitSpan);
                const visitA = document.createElement("a");
                visitA.innerText = park.Visit;
                visitA.href = park.Visit;
                visitA.target = "_blank"
            visitSpan.insertAdjacentElement("afterend", visitA);
            parentDiv.appendChild(visitP);
        }
    }