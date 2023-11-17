"use strict"

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

function getInput() {
    const input = {};
    input.mountainName = document.getElementById("selectMountainName");
    input.effortLevel = document.getElementById("selectEffortLevel");
    input.elevationCheckbox = document.getElementById("elevationCheckbox");
    input.elevationMin = document.getElementById("elevationMin");
    input.elevationMax = document.getElementById("elevationMax");
    input.viewAllMountains = document.getElementById("viewAllMountains");
    input.searchButton = document.getElementById("searchButton");

    return input;
}

function resetButtonClicked() {
    const input = getInput();

    input.viewAllMountains.checked = false;
    input.mountainName.value = "0";
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

function viewAllAndSelectMountain() {
    const input = getInput();
    if(input.viewAllMountains.checked == true) {
        input.mountainName.disabled = true;
        input.effortLevel.disabled = true;
        input.elevationCheckbox.disabled = true;
        input.elevationMin.disabled = true;
        input.elevationMax.disabled = true;
        input.searchButton.disabled = true;
        displayMountains(mountainsArray);
    }
    else if (input.mountainName.value != "0" && input.mountainName.disabled == false) {
        input.effortLevel.value = "0";
        input.effortLevel.disabled = true;
        input.elevationCheckbox.disabled = true;
        input.elevationCheckbox.checked = false;
        input.elevationMin.value = getMinElevation();
        input.elevationMin.disabled = true;
        input.elevationMax.value = getMaxElevation();
        input.elevationMax.disabled = true;
        input.searchButton.disabled = true;

        filterMountainName(input.mountainName.value);
    }
    else {
        enableThis(input);
    }
}

function filterMountainName(selectedMountainName) {
    let mountainDetails = mountainsArray.filter(m => m.name == selectedMountainName);
    displayMountains(mountainDetails);
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

function enableThis(input) {
    input.mountainName.disabled = false;
    input.effortLevel.disabled = false;
    input.elevationCheckbox.disabled = false;
    input.searchButton.disabled = false;

    if(input.elevationCheckbox.checked == false) {
        input.elevationMin.disabled = true;
        input.elevationMax.disabled = true;
    }
    else {
        input.elevationMin.disabled = false;
        input.elevationMax.disabled = false;
    }

    if(input.mountainName.value != 0 && input.viewAllMountains.checked == false) {
        viewAllAndSelectMountain();
        return;
    }
    if(input.effortLevel.value != "0" || input.elevationCheckbox.checked == true) {
        searchButtonClicked();
        return
    }
    else displayMountains(mountainsArray);
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

function displayMountains(mountains) {
    const input = getInput();
    const mainContainer = document.getElementById("display-mountains-content");
    mainContainer.innerText = "";

    mountains.forEach(mountain => {
        displayMountain(mountain, mainContainer);
    });

    const results = document.getElementById("results");
    results.innerText = mountains.length;

    if(mountains.length == 0) {
        const alertMessage = document.getElementById("alert-message");
        alertMessage.hidden = false;
    }
}

function displayMountain(mountain, parentContainer) {
    const eachMountainContainerDiv = document.createElement("div");
    eachMountainContainerDiv.classList.add("each-mountain");
    parentContainer.appendChild(eachMountainContainerDiv);

    displayDetails(mountain, eachMountainContainerDiv);
}

    function displayDetails(mountain, parentDiv) {
        const mountainNameH4 = document.createElement("h4");
        mountainNameH4.innerText = mountain.name;
        parentDiv.appendChild(mountainNameH4);

        getElevation(mountain, parentDiv);
        getEffortLevel(mountain, parentDiv);
        getDescription(mountain, parentDiv);
       

        const dividerHr = document.createElement("hr");
        dividerHr.classList.add("hrJS");
        parentDiv.appendChild(dividerHr);
    }

    function getElevation(mountain, parentDiv) {
        const elevationP = document.createElement("p");
            const elevationSpan = document.createElement("span");
            elevationSpan.innerText = "Elevation: ";
            elevationSpan.classList.add("fw-medium");
            elevationP.appendChild(elevationSpan);
            elevationSpan.insertAdjacentText("afterend", mountain.elevation);
        parentDiv.appendChild(elevationP);
    }

    function getEffortLevel(mountain, parentDiv) {
        const effortLevelP = document.createElement("p");
            const effortLevelSpan = document.createElement("span");
            effortLevelSpan.innerText = "Effort Level: ";
            effortLevelSpan.classList.add("fw-medium");
            effortLevelP.appendChild(effortLevelSpan);
            effortLevelSpan.insertAdjacentText("afterend", mountain.effort);
        parentDiv.appendChild(effortLevelP);
    }

    function getDescription(mountain, parentDiv) {
        const descriptionP = document.createElement("p");
            const descriptionSpan = document.createElement("span");
            descriptionSpan.innerText = "Description: ";
            descriptionSpan.classList.add("fw-medium");
            descriptionP.appendChild(descriptionSpan);
            descriptionSpan.insertAdjacentText("afterend", mountain.desc);
        parentDiv.appendChild(descriptionP);
    }