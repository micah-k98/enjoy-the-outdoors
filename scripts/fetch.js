// Variable for sunrise and sunset time; created so that the orignal mountainArray won't be modified
let newMountainData = [];
mountainsArray.forEach(mountain => {
    let object = {name: mountain.name,
                    sunrise: "",
                    sunset: ""}
    newMountainData.push(object);
})

// Function that can "fetch" the sunrise/sunset times
async function getSunsetForMountain(mountains) {
    for (let i = 0; i < mountains.length; i ++)
    {
        let coords = mountains[i].coords;

        let response = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${coords.lat}&lng=${coords.lng}&date=today`);
            let data = await response.json();

        if(mountains[i].name == newMountainData[i].name)
        {
            newMountainData[i].sunrise = data.results.sunrise;
            newMountainData[i].sunset = data.results.sunset;
        }
    }
   }
   
// Fetch the sunset/sunrise times for a specific mountain 
getSunsetForMountain(mountainsArray).then(data => {
    // Nothing in here
    // This only calls the function and send the mountainsArray data
   });