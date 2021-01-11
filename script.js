const ngeeAnnPoly = { lat: 1.3321, lng: 103.7744 };
const nanyangPoly = { lat: 1.3800, lng: 103.8489};
const republicPoly= { lat: 1.4422, lng: 103.7859 };
const temasekPoly = { lat: 1.3467526, lng: 103.93257659999995};
const singaporePoly = { lat: 1.3098, lng: 103.7775 };

const school = [ngeeAnnPoly, nanyangPoly, republicPoly, temasekPoly, singaporePoly]

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 1.3521, lng: 103.8198 },
    zoom: 11,
  });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

$(document).ready(function(){
  let number = 0;
  $("#nextschool").on("click", function(e) {
    e.preventDefault();
    map = new google.maps.Map(document.getElementById('map'), {
        center: school[number],
        zoom: 15
      });
    marker = new google.maps.Marker({
      position: school[number],
      map: map,
    });
    if (number > 4){
      number = 0;
    } else {
      number += 1;
    }
    
  })
})