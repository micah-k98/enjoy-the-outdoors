"use strict"

document.addEventListener("DOMContentLoaded", () => {
    
    
    document.addEventListener("click", searchButtonClicked);
    addNationalParkName(nationalParksArray);
    addLocationCheckbox(parkTypesArray);
    displayParks(nationalParksArray);
})

function searchButtonClicked(){
    const parkName = document.getElementById("selectParkName");
    const location = document.getElementById("selectLocation");
    
}

function addNationalParkName(parks) {
    const selectContainer = document.getElementById("selectParkName");

        for(let park of parks) {
            const option = new Option(park.LocationName, park.LocationName);
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
            input.id = "viewAllParks";
            input.classList.add("form-check-input");

            const label = document.createElement("label");
            label.for = "viewAllParks";
            label.classList.add("form-check-label");
            label.innerText = parkType;

            checkboxContainer.appendChild(input);
            checkboxContainer.appendChild(label);

        allCheckboxesContainer.appendChild(checkboxContainer);
    })
}

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
                else if (key == "State" || key == "ZipCode") addressP.innerText += `${park[key]} `;
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