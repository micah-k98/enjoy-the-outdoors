# Enjoy the Outdoors

#####Capstone 2
This project is for a website that helps a user find national parks and mountains to explore and enjoy the great outdoors. It inlcudes a responsive homepage that have navigation links to national parks page and mountains page.  

---

## Motivation

The project exists and is perfect for adventurous people who needs to find basic information about national parks based on park name, location and location type (Park, Monumentm Trail, etc...); and mountains based on mountain name, effort level, and elevation.  

It also caters to experts who just want to add more parks and mountains to explore.


## Interesting Piece of this Project
The filter feature of the National Parks Page is an interesting one because of how it works. When the user selects the location and/or location types, and they want to go back and see the full list again, they could just click the "View All National Parks". Doing so, they could still go back to their previously selected filter by unchecking the "View All" checkbox.

And to clear everything, just click the "Reset" button.
![Filter feature in National Parks Page](/images/feature-1.gif)

The first if statement in function viewAllParkAndSelectPark() makes it so that the values are not changed and will only be disabled. But when the checkbox value is false, it would call the function enableThis(). Which will then enables everything and call functions to display the right data.
```
function viewAllParkAndSelectPark() {
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
    else {
        enableThis(input);
    }
}
```
---

Another interesting part is the arrow image that serves as a button to scroll back to the top fast. When the user scrolls at a certain point within the page, the arrow will appear. This feature can be found on both National Parks and Mountains Page.
![Scroll feature](/images/feature-2.gif)

This feature is called through the scroll and click event listener, which then calls the functions to do the effects.
```
const arrow = document.getElementById("arrow");
    document.addEventListener("scroll", whenUserScrolled);
    arrow.addEventListener("click", goToTop);

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
```


## Screenshots

##### Home Page
First part of the homepage: Navbar
![Home Page](/images/home-page-1.jpg "Home Page photo")

Second part of the homepage: Footer
![Home Page](/images/home-page-2.jpg "Home Page photo")

---

##### National Parks Page
![National Parks Page](/images/national-parks-page-1.jpg)

---

##### Mountains Page
![Mountains Page](/images/mountains-page-1.jpg)

---

## Running the Project

##### To get started:
* Simply clone this ```enjoy-the-outdoors``` using git

    ```bash
    git clone https://github.com/micah-k98/enjoy-the-outdoors.git
    ```
 * Then run it through your favorite code editor like Visual Studio Code (VSCode)