import { mapService } from './services/map-service.js'
import { utilService } from './services/utils-service.js'
import { storageService } from './services/storage-service.js'

window.gMap;
window.marker;
console.log('Main!');

mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    document.querySelector('form').addEventListener('submit', (ev) => {
        ev.preventDefault();
        var elInputVal = document.querySelector('input').value;
        onAddressToGeo(elInputVal)
    })
<<<<<<< HEAD
    renderLocations()
    addBinEventListeners()
    document.querySelector('.btn').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        panTo(35.6895, 139.6917);
    })
=======
    // document.querySelector('.btn').addEventListener('click', (ev) => {
    //     console.log('Aha!', ev.target);
    //     panTo(35.6895, 139.6917);
    // })

>>>>>>> 811adc725716212ec6d09ae036e15a4ce989fc90
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
.then(renderWeather)


function renderWeather(weather) {
    const elWeather = document.querySelector('.top-card')
    var strHtml =  `<h2>${weather.wheather}</h2>
    <h3>${weather.wind}</h3>`
    elWeather.innerHTML = strHtml
}


 
function onAddressToGeo(elInputVal){
    mapService.addressToGeo(elInputVal)
        .then(coords => {
            panTo(coords.lat, coords.lng);
            addMarker({ lat: coords.lat, lng: coords.lng });
            window.marker.addListener("click", () => {
                mapService.geoToAddress(coords.lat, coords.lng)
                renderLocations()
        });
    })  
}
<<<<<<< HEAD

// function onRemoveFromLocation(idx){
//     console.log('deleted');
//     mapService.removeFromLocation(idx);
//     renderLocations();
// }

function renderLocations(){
    const elList = document.querySelector('.location-list');
    const locations = mapService.getLocations();
    console.log('locations are',locations);
    if(!locations || !locations.length) return;
    const strHTML = locations.map((location, i) => {
        return `<li>
        <a href="#"> ${location.name} </a> 
        <span data-idx="${i}" class="bin"> ♻ </span>
        </li>`
    })  
    elList.innerHTML = strHTML.join(' ')
}

function addBinEventListeners(){
    const elBins = document.querySelectorAll('.bin')
    elBins.forEach((bin) => {
        (function(){
        bin.addEventListener('click', (ev) => {
                const idx = +ev.target.dataset.idx;
                console.log(idx);
                mapService.removeFromLocation(idx);
                renderLocations();
            })
        }())
    })
}
=======
>>>>>>> 811adc725716212ec6d09ae036e15a4ce989fc90
