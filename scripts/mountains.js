"use strict"

document.addEventListener("DOMContentLoaded", () => {

    addData();
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