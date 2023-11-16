"use strict"

document.addEventListener("DOMContentLoaded", () => {
    
    addData(nationalParksArray, locationsArray, parkTypesArray);
    displayParks(nationalParksArray);

    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchButtonClicked);

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetButtonClicked);

    const viewAllParksBox = document.getElementById("viewAllParks");
    viewAllParksBox.addEventListener("click", viewAllParkAndSelectPark);

    const selectParkName = document.getElementById("selectParkName");
    selectParkName.addEventListener("click", viewAllParkAndSelectPark);

    const arrow = document.getElementById("arrow");
    document.addEventListener("scroll", whenUserScrolled);
    arrow.addEventListener("click", goToTop);
    
})

function getInput() {
    const input = {};
    input.parkName = document.getElementById("selectParkName");
    input.location = document.getElementById("selectLocation");
    // this targets the form-check for each checkbox and label
    input.allCheckboxesContainer = document.getElementById("checkbox-container").children;
    input.checkedLocationTypes = isLocationTypeChecked(input.allCheckboxesContainer);
    input.viewAllParks = document.getElementById("viewAllParks");

    return input;
}

function resetButtonClicked() {
    const input = getInput();

    input.parkName.value = "0";
    input.parkName.disabled = false;
    input.location.value = "0";
    input.location.disabled = false;
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

// this function will check if either of the select park name or view all parks is selected/checked
function viewAllParkAndSelectPark() {
    const input = getInput();
    if(input.viewAllParks.checked  == true) {
        // input.parkName.value = "0";
        input.parkName.disabled = true;
        // input.location.value = "0";
        input.location.disabled = true;
        for(let child of input.allCheckboxesContainer){
            // document.getElementById(child.children[0].id).checked = false;
            child.children[0].disabled = true
        }
        displayParks(nationalParksArray);
    }
    else if(input.parkName.value != "0" && input.parkName.disabled == false) {
        input.location.value = "0";
        input.location.disabled = true;
        for(let child of input.allCheckboxesContainer){
            document.getElementById(child.children[0].id).checked = false;
            child.children[0].disabled = true
        }
        filterParkName(input.parkName.value);
    }
    else {
        enableThis(input);
    }
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

function enableThis(input) {
    input.parkName.disabled = false;
    input.location.disabled = false;
    for(let child of input.allCheckboxesContainer){
        child.children[0].disabled = false
    }
    
    if(input.parkName.value != "0") {
        viewAllParkAndSelectPark();
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


function addData(nationalParksArray, locationsArray, parkTypesArray) {
    addNationalParkName(nationalParksArray);
    addLocations(locationsArray);
    addLocationCheckbox(parkTypesArray);

    function addNationalParkName(parks) {
        const selectContainer = document.getElementById("selectParkName");
    
            for(let park of parks) {
                const option = new Option(park.LocationName, park.LocationName);
                selectContainer.appendChild(option);
            }
    }
    
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

function displayParks(parks) {
    const input = getInput();
    const mainContainer = document.getElementById("display-parks-content");
    mainContainer.innerText = "";

    parks.forEach(park => {
        displayPark(park, mainContainer);
    });

    const results = document.getElementById("results");
    results.innerText = parks.length;

    if(parks.length == 0) {
        const alertMessage = document.getElementById("alert-message");
        alertMessage.hidden = false;
        const state = document.getElementById("state");
        state.innerText = input.location.value;

    }
}

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

            addressP.innerText = "Address: ";
            for(const key in park) {
                if(key == "Address" || key == "City")
                {
                    if(park[key] != 0) addressP.innerText += `${park[key]}, `;
                }
                else if (key == "State") addressP.innerText += `${park[key]} `;
                else if (key == "ZipCode") 
                {
                    if(park[key] != 0) addressP.innerText += `${park[key]} `;
                }
                
            }

        parentDiv.appendChild(addressP);
    }

    function getPhoneFaxNumber(park, parentDiv) {
        const phoneNumberP = document.createElement("p");
            if (park.Phone != 0) {
                phoneNumberP.innerText = "Phone Number: " + park.Phone;
            }
        parentDiv.appendChild(phoneNumberP);

        const faxNumberP = document.createElement("p");
            if (park.Fax != 0) {
                faxNumberP.innerText = "Fax Number: " + park.Fax;
                parentDiv.appendChild(faxNumberP);
            }
        parentDiv.appendChild(faxNumberP);
    }

    function getVisit(park, parentDiv) {
        const visitP = document.createElement("p");
            const visitA = document.createElement("a");

                if (park.Visit != undefined) {
                    visitP.innerText = "Visit: ";
                    visitA.innerText = park.Visit;
                    visitA.href = park.Visit;
                    visitA.target = "_blank"
                    
                }

            visitP.appendChild(visitA)
        parentDiv.appendChild(visitP);
    }


// function doesValueExists(details, park, parentDiv) {
//     details.addressP.innerText = "Address: ";
//     for(const key in park) {
//         if(key == "Address" || key == "City")
//         {
//             if(park[key] != 0) details.addressP.innerText += `${park[key]}, `;
//         }
//         else if (key == "State" || key == "ZipCode") details.addressP.innerText += `${park[key]} `;
//     }
//     parentDiv.appendChild(details.addressP);
    
//     if (park.Phone != 0) {
//         details.phoneNumberP.innerText = "Phone Number: " + park.Phone;
//         parentDiv.appendChild(details.phoneNumberP);
//     }
    
//     if (park.Fax != 0) {
//         details.faxNumberP.innerText = "Fax Number: " + park.Fax;
//         parentDiv.appendChild(details.faxNumberP);
//     }

//     if (park.Visit != undefined) {
//         details.visitP.innerText = "Visit: ";
//         details.visitA.innerText = park.Visit;
//         details.visitA.href = park.Visit;
//         details.visitA.target = "_blank"
//         details.visitP.appendChild(details.visitA)
//         parentDiv.appendChild(details.visitP);
//     }


    // let details = {};
    // details.parkNameH4 = document.createElement("h4");
    // details.addressP = document.createElement("p");
    // details.phoneNumberP = document.createElement("p");
    // details.faxNumberP = document.createElement("p");
    // details.visitP = document.createElement("p");
    //     details.visitA = document.createElement("a");

    // details.parkNameH4.innerText = park.LocationName;
    // parentDiv.appendChild(details.parkNameH4);
    
    // doesValueExists(details, park, parentDiv);  
// }