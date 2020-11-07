import { Modal } from './UI/Modal';
// import * as Modal from './UI/Modal';
import { Mapclass } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    // const enableNotificationsButtons = document.querySelectorAll('.enable-notifications');
    // // console.log(window, window.Notification);
    // if ('Notification' in window) {
    //   for (var i = 0; i < enableNotificationsButtons.length; i++) {
    //     enableNotificationsButtons[i].style.display = 'inline-block';
    //     enableNotificationsButtons[i].addEventListener('click', this.askForNotificationPermission);
    //   }
    // }

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const zoomIndicate = document.getElementById('zoom-indicator');
    const txZoomIndex = zoomIndicate.textContent;
    const sharedLinkInputElement = document.getElementById('share-link');

    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }

    navigator.clipboard.writeText(sharedLinkInputElement.value  + `&zoom=${txZoomIndex}`)
      .then(() => {
        alert('Copied into clipboard!');

        window.location.href = sharedLinkInputElement.value + `&zoom=${txZoomIndex}`;
      })
      .catch(err => {
        console.log(err);
        sharedLinkInputElement.select();
      });
  }

  selectPlace(coordinates, address, zoomFactor) {

    const zoomIndicate = document.getElementById('zoom-indicator');
    const zoomIndex = Number(zoomIndicate.textContent) || zoomFactor;

    if (this.map) {
      // console.log(this.map);
      // console.log(zoomIndicate);
      // console.log('zoomIndex', zoomIndex);

      this.map.render(coordinates, zoomIndex);
    } else {

      this.map = new Mapclass(coordinates, zoomIndex);
      // console.log(this.map);
    }
    this.shareBtn.disabled = false;
    const sharedLinkInputElement = document.getElementById('share-link');
    sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;

  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Location feature is not available in your browser - please use a more modern browser or manually enter an address.'
      );
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async successResult => {
        const coordinates = {
          // lat: successResult.coords.latitude + Math.random() * 50,
          // lng: successResult.coords.longitude + Math.random() * 50
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude
        };
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address, zoomLevel);
      },
      error => {
        modal.hide();
        alert(
          'Could not locate you unfortunately. Please enable location for this site in your browser'
        );
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    
    const address = event.target.querySelector('input').value;
    console.log(address);

    const lat = document.getElementById('lat-input').value;
    const lng = document.getElementById('lng-input').value;
    // let zoomLevel = document.getElementById('zoom-level').value;
    let zoomLevel = "4"
    console.log('lat', lat, 'lng', lng);
    
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    // console.log(isNumeric(lat));
    if (
      (!lat || Number(lat) < -90 || Number(lat) > 90 || !isNumeric(lat)) ||
      (!lng || Number(lng) < -180 || Number(lng) > 180  || !isNumeric(lng))
    ) {
      alert('Please enter valid Latitude and Longitude');
    }

    if (!zoomLevel || Math.floor(Number(zoomLevel)) > 28 || Math.floor(Number(zoomLevel)) <  0 || !isNumeric(zoomLevel)) {
      zoomLevel = 4;
    } else {
      zoomLevel = Math.floor(Number(zoomLevel));
    }
    console.log('zoomLevel', zoomLevel);

    // if (!address || address.trim().length === 0) {
    //   alert('Invalid address entered - please try again!');
    //   return;
    // }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait!'
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address, lat, lng);
      this.selectPlace(coordinates, address, zoomLevel);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }


  // notification from pwa-course
  askForNotificationPermission() {
    Notification.requestPermission(function(result) {
      console.log('User Choice', result);
      if (result !== 'granted') {
        console.log('No notification permission granted!');
      } else {
        displayConfirmNotification();
      }
    });
  }
  
}

const placeFinder = new PlaceFinder();


// notification from pwa-course
// function askForNotificationPermission() {
//   Notification.requestPermission(function(result) {
//     console.log('User Choice', result);
//     if (result !== 'granted') {
//       console.log('No notification permission granted!');
//     } else {
//       displayConfirmNotification();
//     }
//   });
// }

// if ('Notification' in window) {
//   for (var i = 0; i < enableNotificationsButtons.length; i++) {
//     enableNotificationsButtons[i].style.display = 'inline-block';
//     enableNotificationsButtons[i].addEventListener('click', askForNotificationPermission);
//   }
// }
