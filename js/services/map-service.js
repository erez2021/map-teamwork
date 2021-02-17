export const mapService = {
    getLocs,
    getWeather,
    geoToAddress
}

// import {
//     utilService
// } from './storage-service.js'

const KEY = 'locationsDB'

var locs = [{
    lat: 11.22,
    lng: 22.11
}]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

const W_KEY = 'b5fe3e631d79d729776cdbfd151f76ed'

function getWeather(newLat, newLng) {
    var prmWeather = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${newLat}&lon=${newLng}&APPID=${W_KEY}`)
    .then(res => {
        return {
            wheather: res.data.main.temp,
            wind: res.data.wind.speed
        }
    })
    return prmWeather
}

function geoToAddress(lat, lng) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDh4V0vPsJ6vUzqAnogu83nmHbm_nK48fA`)
    .then(res => res.data.results[0].formatted_address)
    .then(res => console.log(res))
}