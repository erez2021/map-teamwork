export const mapService = {
    getLocs,
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

function geoToAddress(lat, lng) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDh4V0vPsJ6vUzqAnogu83nmHbm_nK48fA`)
    .then(res => res.data.results[0].formatted_address)
    .then(res => console.log(res))
}