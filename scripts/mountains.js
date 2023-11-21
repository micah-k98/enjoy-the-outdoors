"use strict"

// Global variables are needed to check if there is a previous selected mountain name; 
// This way, no matter how many times the user clicks any mountain name, view all checkbox, or the reset button; the max-height will be controlled
let currentMountainName = "0";
let counter = 0;

document.addEventListener("DOMContentLoaded", () => {

    addData();
    displayMountains(mountainsArray);
    getMinElevation();
    getMaxElevation();

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetButtonClicked);

    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchButtonClicked);

    const viewAllMountainsBox = document.getElementById("viewAllMountains");
    viewAllMountainsBox.addEventListener("change", viewAllAndSelectMountain);

    const selectMountainName = document.getElementById("selectMountainName");
    selectMountainName.addEventListener("change", viewAllAndSelectMountain);

    const elevationCheckbox = document.getElementById("elevationCheckbox");
    elevationCheckbox.addEventListener("click", isElevationBoxChecked);

    const arrow = document.getElementById("arrow");
    document.addEventListener("scroll", whenUserScrolled);
    arrow.addEventListener("click", goToTop);
});

// Function responsible for getting all the inputted data
function getInput() {
    const input = {};
    input.mountainName = document.getElementById("selectMountainName");
    input.effortLevel = document.getElementById("selectEffortLevel");
    input.elevationCheckbox = document.getElementById("elevationCheckbox");
    input.elevationMin = document.getElementById("elevationMin");
    input.elevationMax = document.getElementById("elevationMax");
    input.viewAllMountains = document.getElementById("viewAllMountains");
    input.searchButton = document.getElementById("searchButton");
    input.timeSection = document.getElementById("timeSection");

    return input;
}

// Just to manage the css style for the max-height of the filter-mountains section
function getStyle() {
    const cssStyle ={};
    cssStyle.filterMountainsDiv = document.getElementById("filter-mountains");
    cssStyle.cssObj = window.getComputedStyle(cssStyle.filterMountainsDiv);
    cssStyle.maxHeight = parseFloat(cssStyle.cssObj.getPropertyValue("max-height"));
    
    return cssStyle;
}

function resetButtonClicked() {
    const input = getInput();

    // To control the max-height
    if(input.mountainName.value != 0 && counter > 0 && input.viewAllMountains.checked == false) {
        const cssStyle = getStyle();
        cssStyle.filterMountainsDiv.style.maxHeight = cssStyle.maxHeight - 208 + "px";
    }
    currentMountainName = "0";
    counter = 0;

    input.viewAllMountains.checked = false;
    input.mountainName.value = "0";
    input.timeSection.hidden = true;
    input.effortLevel.value = "0";
    input.elevationCheckbox.checked = false;
    input.elevationMin.value = getMinElevation();
    input.elevationMax.value = getMaxElevation();
    enableThis(input);
}

function searchButtonClicked() {
    const input = getInput();

    if(input.effortLevel.value != "0") {
        const filteredByEffortLevel = filterByEffortLevel();
        if(input.elevationCheckbox.checked == false) displayMountains(filteredByEffortLevel);
        else filterByElevation();
    }
    else if(input.elevationCheckbox.checked == true) filterByElevation();
    else displayMountains(mountainsArray);
}

// Function fires when there are changes in select form "Select Mountain Name" and checkbox "View All Mountains"
function viewAllAndSelectMountain() {
    const input = getInput();
    if(input.viewAllMountains.checked == true) {
        // To control the max-height
        if(input.mountainName.value != 0) {
            const cssStyle = getStyle();
            cssStyle.filterMountainsDiv.style.maxHeight = cssStyle.maxHeight - 208 + "px";
        }
        counter = 0;
        
        input.mountainName.disabled = true;
        input.timeSection.hidden = true;
        input.effortLevel.disabled = true;
        input.elevationCheckbox.disabled = true;
        input.elevationMin.disabled = true;
        input.elevationMax.disabled = true;
        input.searchButton.disabled = true;
        displayMountains(mountainsArray);
    }
    else if (input.mountainName.value != "0" && input.mountainName.disabled == false) {
        // To control the max-height
        if(counter > 0) {
            const cssStyle = getStyle();
            cssStyle.filterMountainsDiv.style.maxHeight = cssStyle.maxHeight - 208 + "px";
        }
        counter += 1;

        input.effortLevel.value = "0";
        input.effortLevel.disabled = true;
        input.elevationCheckbox.disabled = true;
        input.elevationCheckbox.checked = false;
        input.elevationMin.value = getMinElevation();
        input.elevationMin.disabled = true;
        input.elevationMax.value = getMaxElevation();
        input.elevationMax.disabled = true;
        input.searchButton.disabled = true;
        currentMountainName = input.mountainName.value;

        filterMountainName(input.mountainName.value);
    }
    else if(currentMountainName != "0" && input.mountainName.value == "0") {
        // To control the max-height
        currentMountainName = "0";
        counter = 0;
        const cssStyle = getStyle();
        cssStyle.filterMountainsDiv.style.maxHeight = cssStyle.maxHeight - 208 + "px";
        
        enableThis(input);
    }
    else enableThis(input);
}

function filterMountainName(selectedMountainName) {
    let mountainDetails = mountainsArray.filter(m => m.name == selectedMountainName);
    displayMountains(mountainDetails);
    displaySunriseSunsetTime();
}

function filterByEffortLevel() {
    const input = getInput();
    return mountainsArray.filter(m => m.effort == input.effortLevel.value)
}

function isElevationBoxChecked(){
    const input = getInput();

    if(input.elevationCheckbox.checked == false) {
        input.elevationMin.disabled = true;
        input.elevationMax.disabled = true;
    }
    else{
        input.elevationMin.disabled = false;
        input.elevationMax.disabled = false;
    }
}

function filterByElevation() {
    const input = getInput();
    let filteredMountains = filterByEffortLevel();
    if(filteredMountains.length == 0) filteredMountains = mountainsArray;

    filteredMountains = filteredMountains.filter(m => m.elevation >= input.elevationMin.value && m.elevation <= input.elevationMax.value);
    
    displayMountains(filteredMountains);
}

// Function responsible for returning back the disabled parts to being enabled
function enableThis(input) {
    input.mountainName.disabled = false;
    input.effortLevel.disabled = false;
    input.elevationCheckbox.disabled = false;
    input.searchButton.disabled = false;

    // Needed because of the logic that min and max can only be changed if the checkbox "Elevation" is checked
    if(input.elevationCheckbox.checked == false) {
        input.elevationMin.disabled = true;
        input.elevationMax.disabled = true;
    }
    else {
        input.elevationMin.disabled = false;
        input.elevationMax.disabled = false;
    }

    // Fires after the checkbox "View All Mountains" was unchecked (after it was checked)
    // So that the last selected filters will be loaded again
    if(input.mountainName.value != 0 && input.viewAllMountains.checked == false) {
        viewAllAndSelectMountain();
        return;
    }
    if(input.effortLevel.value != "0" || input.elevationCheckbox.checked == true) {
        searchButtonClicked();
        return
    }
    else {
        displayMountains(mountainsArray);
        input.timeSection.hidden = true;
    }
}

function getMinElevation() {
    const input = getInput();

    let minValue = mountainsArray[0].elevation;
    mountainsArray.forEach(m => {
        if(m.elevation < minValue) minValue = m.elevation;
    });

    input.elevationMin.value = minValue;
    return minValue;
}

function getMaxElevation() {
    const input = getInput();

    let maxValue = mountainsArray[0].elevation;
    mountainsArray.forEach(m => {
        if(m.elevation > maxValue) maxValue = m.elevation;
    })

    input.elevationMax.value = maxValue;
    return maxValue;
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

// Adding data into select forms
function addData() {
    addMountainName();
    addEffortLevel();

    function addMountainName() {
        const input = getInput();

        for(let mountain of mountainsArray) {
            const option = new Option(mountain.name, mountain.name);
            input.mountainName.appendChild(option);
        }        
    }

    function addEffortLevel() {
        const input = getInput();

        for(let mountain of mountainsArray) {
           if(input.effortLevel.children.length == 1) {
                const option = new Option(mountain.effort, mountain.effort);
                input.effortLevel.appendChild(option);
            }
            else {
                let effortLevelList = [];
                for(let child of input.effortLevel.children) {
                    effortLevelList.push(child.innerText);
                }
                let test = effortLevelList.find(effort => effort == mountain.effort);
                if(test == undefined){
                    const option = new Option(mountain.effort, mountain.effort);
                    input.effortLevel.appendChild(option);
                }
            }
        }
    }
}

// Main container for the whole output
function displayMountains(mountains) {
    const input = getInput();
    const mainContainer = document.getElementById("display-mountains-content");
    mainContainer.innerText = "";

    mountains.forEach(mountain => {
        displayMountain(mountain, mainContainer);
    });

    const results = document.getElementById("results");
    results.innerText = mountains.length;

    const alertMessage = document.getElementById("alert-message");
    if(mountains.length == 0) alertMessage.hidden = false;
    else alertMessage.hidden = true;
}

// For each mountain
function displayMountain(mountain, parentContainer) {
    const eachMountainContainerDiv = document.createElement("div");
    eachMountainContainerDiv.classList.add("each-mountain");
    parentContainer.appendChild(eachMountainContainerDiv);

    displayDetails(mountain, eachMountainContainerDiv);
}

    function displayDetails(mountain, parentDiv) {
        const textImageDiv = document.createElement("div");
        textImageDiv.classList.add("square");

            const image = document.createElement("img");
            image.src = "images/mountains/" + mountain.img;
            image.alt = mountain.name;
            image.classList.add("img-fluid");
            textImageDiv.appendChild(image);

            const mountainNameH4 = document.createElement("h4");
            mountainNameH4.innerText = mountain.name;
            textImageDiv.appendChild(mountainNameH4);

            addElevation(mountain, textImageDiv);
            addEffortLevel(mountain, textImageDiv);
            addDescription(mountain, textImageDiv);

        parentDiv.appendChild(textImageDiv);

        const dividerHr = document.createElement("hr");
        dividerHr.classList.add("hrJS");
        parentDiv.appendChild(dividerHr);
    }

    function addElevation(mountain, textImageDiv) {
        const elevationP = document.createElement("p");
            const elevationSpan = document.createElement("span");
            elevationSpan.innerText = "Elevation: ";
            elevationSpan.classList.add("fw-medium");
            elevationP.appendChild(elevationSpan);
            elevationSpan.insertAdjacentText("afterend", mountain.elevation);
        textImageDiv.appendChild(elevationP);
    }

    function addEffortLevel(mountain, textImageDiv) {
        const effortLevelP = document.createElement("p");
            const effortLevelSpan = document.createElement("span");
            effortLevelSpan.innerText = "Effort Level: ";
            effortLevelSpan.classList.add("fw-medium");
            effortLevelP.appendChild(effortLevelSpan);
            effortLevelSpan.insertAdjacentText("afterend", mountain.effort);
        textImageDiv.appendChild(effortLevelP);
    }

    function addDescription(mountain, textImageDiv) {
        const descriptionP = document.createElement("p");
            const descriptionSpan = document.createElement("span");
            descriptionSpan.innerText = "Description: ";
            descriptionSpan.classList.add("fw-medium");
            descriptionP.appendChild(descriptionSpan);
            descriptionSpan.insertAdjacentText("afterend", mountain.desc);
        textImageDiv.appendChild(descriptionP);
    }

function displaySunriseSunsetTime() {
    const input = getInput();

    // To control the max-height
    const cssStyle = getStyle();
    cssStyle.filterMountainsDiv.style.maxHeight = cssStyle.maxHeight + 208 + "px";
    input.timeSection.hidden = false;

    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");

    newMountainData.forEach(mountain => {
        if (input.mountainName.value == mountain.name) {
            let sunriseTime = getTime(mountain.sunrise);
            let sunsetTime = getTime(mountain.sunset);
            sunrise.innerText = `${sunriseTime}`;
            sunset.innerText = `${sunsetTime}`;
        }
    });
}

    // Converting from UTC to Eastern Time; needed for function displaySunriseSunsetTime
    function getTime(time) {
        // is it AM or PM?
        let offset = -5;
        const space = time.indexOf(" ");
        let amORpm = time.substring(space + 1);
        
        // get the hours
        const colon = time.indexOf(":");
        let orginalHours = time.substring(0, colon);
        let hours = +time.substring(0, colon);
        let newHours = 0;
        
        // conditions
        if(amORpm == "AM") {
            newHours = hours + offset;
            if(newHours < 0) {
                newHours += 12;
                time.replace(amORpm, "PM");
            }
        }
        else {
            hours += 12;
            newHours = hours + offset;
            if(newHours < 12) {
                time.replace(amORpm, "AM");
            }
            else if(newHours > 12) newHours -= 12;
        }
    
        return time.replace(orginalHours, newHours);
    }