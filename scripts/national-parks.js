"use strict"

document.addEventListener("DOMContentLoaded", () => {
    
    displayParks(nationalParksArray);
})

function displayParks(parks) {
    const mainContainer = document.getElementById("display-parks-content");
    mainContainer.innerText = "";

    parks.forEach(park => {
        displayPark(park, mainContainer);
    });
}

function displayPark(park, parentContainer) {
    const eachParkContainerDiv = document.createElement("div");
    eachParkContainerDiv.classList.add("each-park");
    parentContainer.appendChild(eachParkContainerDiv);

    displayDetails(park, eachParkContainerDiv);
}

function displayDetails(park, parentDiv) {
    let details = {};
    details.parkNameH4 = document.createElement("h4");
    details.addressP = document.createElement("p");
    details.phoneNumberP = document.createElement("p");
    details.faxNumberP = document.createElement("p");
    details.visitP = document.createElement("p");
        details.visitA = document.createElement("a");
        details.visitP.appendChild(details.visitA);

    details.parkNameH4.innerText = park.LocationName;
    parentDiv.appendChild(details.parkNameH4);
    
    doesValueExists(details, park, parentDiv);
    
    
    
    
    
    
}

function doesValueExists(details, park, parentDiv) {
    let parkAddress = {};
    details.addressP.innerText = "Address: ";
    for(const key in park) {
        if(key == "Address" || key == "City")
        {
            if(park[key] != 0) details.addressP.innerText += `${park[key]}, `;
        }
        else if (key == "State" || key == "ZipCode") details.addressP.innerText += `${park[key]} `;
    }
    parentDiv.appendChild(details.addressP);
    
    if (park.Phone != 0) {
        details.phoneNumberP.innerText = "Phone Number: " + park.Phone;
        parentDiv.appendChild(details.phoneNumberP);
    }
    
    if (park.Fax != 0) {
        details.faxNumberP.innerText = "Fax Number: " + park.Fax;
        parentDiv.appendChild(details.faxNumberP);
    }

    if (park.Visit != undefined) {
        details.visitP.innerText = "Visit: ";
        details.visitA.innerText = park.Visit;
        details.visitA.href = park.Visit;
        details.visitA.target = "_blank"
        details.visitP.appendChild(details.visitA)
        parentDiv.appendChild(details.visitP);
    }
}