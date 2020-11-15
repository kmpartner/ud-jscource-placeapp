
import sanitizeHtml from 'sanitize-html';

import { Mapclass } from './UI/Map';

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


new LoadedPlace(coords, address, zoomLevel);

