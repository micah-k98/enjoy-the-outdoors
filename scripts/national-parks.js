"use strict"

document.addEventListener("DOMContentLoaded", () => {
    
    displayParks(nationalParksArray);
})

function displayParks(parks) {
    const mainContainer = document.getElementById("display-parks-content");
    mainContainer.innerText = "";

    // parks.forEach(park => {
        displayPark(parks[0], mainContainer);
    // });
}

function displayPark(park, parentContainer) {
    const eachParkContainerDiv = document.createElement("div");
    eachParkContainerDiv.classList.add("each-park");
    parentContainer.appendChild(eachParkContainerDiv);

    displayDetails(park, eachParkContainerDiv);
}

function displayDetails(park, parentDiv) {
    const parkNameH4 = document.createElement("h4");
    const addressP = document.createElement("p");
    const phoneNumberP = document.createElement("p");
    const faxNumberP = document.createElement("p");
    const visitA = document.createElement("a");

    parkNameH4.innerText = park.LocationName;
    addressP.innerText = `Address: ${park.Address}, ${park.City}, ${park.State} ${park.ZipCode}`;
    phoneNumberP.innerText = park.Phone;
    faxNumberP.innerText = park.Fax;
    visitA.innerText = park.Visit;
    visitA.href = park.Visit;
    visitA.target = "_blank"

    parentDiv.appendChild(parkNameH4);
    parentDiv.appendChild(addressP);
    parentDiv.appendChild(phoneNumberP);
    parentDiv.appendChild(faxNumberP);
    parentDiv.appendChild(visitA);
}