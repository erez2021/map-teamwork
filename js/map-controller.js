import { mapService } from './services/map-service.js'
import { storageService } from './services/utils-service.js'

window.gMap;
window.marker;
console.log('Main!');

mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    
    document.querySelector('.btn').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        panTo(35.6895, 139.6917);
    })

    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(() => console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
    }
    
    
    
    function initMap(lat = 32.0749831, lng = 34.9120554) {
        console.log('InitMap');
        return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            window.gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            window.gMap.addListener("click", (mapsMouseEvent) => {
                   const newLat = +JSON.stringify(mapsMouseEvent.latLng.toJSON().lat)
                   const newLng = +JSON.stringify(mapsMouseEvent.latLng.toJSON().lng)
                    window.marker.setMap(null);
                    panTo(newLat,newLng)
                    addMarker({ lat: newLat, lng: newLng })
                    window.marker.addListener("click", () => {
                        mapService.geoToAddress(newLat, newLng)
                     });
            })
        })
}

function addMarker(loc) {
    window.marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return window.marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDh4V0vPsJ6vUzqAnogu83nmHbm_nK48fA'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

mapService.getWeather()
.then(weather => console.log(weather))
.then(renderWeather)

function renderWeather(weather) {
    const elWeather = document.querySelector('.top-card')
    var strHtml =  `<h2>${weather}</h2>`
    return elWeather.innerHTML = strHtml.join('')
}


 
