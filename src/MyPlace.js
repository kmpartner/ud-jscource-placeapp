import { Mapclass } from './UI/Map';
import { Modal } from './UI/Modal';
import sanitizeHtml from 'sanitize-html';

class LoadedPlace {
  constructor(coordinates, address) {

    new Mapclass(coordinates);
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
new LoadedPlace(coords, address);

