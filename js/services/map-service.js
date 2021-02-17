export const mapService = {
    getLocs,
    getWeather
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

function getWeather() {
    var prmWeather = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${locs[0].lat}&lon=${locs[0].lng}&APPID=${W_KEY}`)
    .then(res => {
        return {
            wheather: res.data.main.temp,
            wind: res.data.wind.speed
        }
    })
    return prmWeather
}