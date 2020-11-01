import { Mapclass } from './UI/Map';
import { Modal } from './UI/Modal';
import sanitizeHtml from 'sanitize-html';

class LoadedPlace {
  constructor(coordinates, address, zoomLevel) {

    new Mapclass(coordinates, zoomLevel);
    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.innerHTML = sanitizeHtml(address);

  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
  lat: parseFloat(queryParams.get('lat')),
  lng: +queryParams.get('lng')
};
const address = queryParams.get('address');
const zoomLevel = queryParams.get('zoom');

// const twitterButton = document.getElementById('twitter-button');
// twitterButton.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + ` Search palce link: ${url}`);
// href="https://twitter.com/intent/tweet?text=Hello%20world"

new LoadedPlace(coords, address, zoomLevel);

