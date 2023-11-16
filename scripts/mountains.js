"use strict"

document.addEventListener("DOMContentLoaded", () => {

    addData();
    displayMountains(mountainsArray);

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetButtonClicked);

    const viewAllMountainsBox = document.getElementById("viewAllMountains");
    viewAllMountainsBox.addEventListener("change", viewAllAndSelectMountain);

    const selectMountainName = document.getElementById("selectMountainName");
    selectMountainName.addEventListener("change", viewAllAndSelectMountain);
});

function getInput() {
    const input = {};
    input.mountainName = document.getElementById("selectMountainName");
    input.effortLevel = document.getElementById("selectEffortLevel");
    input.elevationMin = document.getElementById("elevationMin");
    input.elevationMax = document.getElementById("elevationMax");
    input.viewAllMountains = document.getElementById("viewAllMountains");

    return input;
}

function resetButtonClicked() {
    const input = getInput();

    input.viewAllMountains.checked = false;
    input.mountainName.value = "0";
    input.effortLevel.value = "0";
    input.elevationMin.value = "0";
    input.elevationMax.value = "0";
    enableThis(input);
}

function viewAllAndSelectMountain() {
    const input = getInput();
    if(input.viewAllMountains.checked == true) {
        input.mountainName.disabled = true;
        input.effortLevel.disabled = true;
        input.elevationMin.disabled = true;
        input.elevationMax.disabled = true;
        displayMountains(mountainsArray);
    }
    else if (input.mountainName.value != "0" && input.mountainName.disabled == false) {
        input.effortLevel.value = "0";
        input.effortLevel.disabled = true;
        input.elevationMin.value = "0";
        input.elevationMin.disabled = true;
        input.elevationMax.value = "0";
        input.elevationMax.disabled = true;
    }
    else {
        enableThis(input);
    }
}

function enableThis(input) {
    input.mountainName.disabled = false;
    input.effortLevel.disabled = false;
    input.elevationMin.disabled = false;
    input.elevationMax.disabled = false;
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

    // if(mountains.length == 0) {
    //     const alertMessage = document.getElementById("alert-message");
    //     alertMessage.hidden = false;
    //     const state = document.getElementById("state");
    //     state.innerText = input.location.value;

    // }
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