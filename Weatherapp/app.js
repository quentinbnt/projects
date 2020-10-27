let appId = "cba9b9b3ece82326c13810bf92a3978c";
let units = "metric";
let searchMethod = "zip"; 
// const linktoAppi = `https://api.openweathermap.org/data/2.5/weather?q=$(city)&appid=$(apiKey);
// const city = "";

function searchWeather(searchTerm){
    fetch(`http://api.openweathermap.org/data/2.5/weather?$(searchMethod)=$(searchTerm)&APPID=$(appId)&units=$(units)`)
    .then(result =>{
        return result.json(); 
    })
    .then(result =>{
            init(result);
        
    })
}


function init(resultFromServer) {
    console.log(resultFromServer)
}

// Hook up the search button
document.getElementById('searchBtn').addEventListener('click', ()=> {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})





// //We gonna check where we at
// window.addEventListener('load', ()=> {
//     // define long and lat variables
//     let long;
//     let lat;
//     // If true then continue - the browser found the geocoordinates
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position =>{
//             console.log(position);
//             long = position.coords.longitude;
//             lat = position.coords.latitude;
//         });
//     }
// });




// fetch()
//     .then() 

// getElementbyId

// Make a connection to the JS file

// Make a connection to the elements of the JS file

//function that takes the city
