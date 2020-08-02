// import 'ol/ol.css';
// import {Map, View} from 'ol';

// import 'ol/ol.css';
import {Map, View} from 'ol';
// import TileLayer from 'ol/layer/Tile';
import OSMSource from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import {circular} from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import Control from 'ol/control/Control';
import {Style, Icon, Fill} from 'ol/style';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Modal } from './Modal';

export class Mapclass {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
  }

  render(coordinates) {
    // if (!google) {
    //   alert('Could not load map libray - please try again later!');
    //   return;
    // }

    // new google.maps.Map(document.getElementById('map'), {
    //   center: coordinates,
    //   zoom: 16,
    // });

    // new google.maps.Marker({
    //   position: coordinates,
    //   map: map
    // })

    // const modal = new Modal(
    //   'loading-modal-content',
    //   'Loading location - please wait!'
    // );
    // modal.show();

    console.log(coordinates);
    document.getElementById('map').textContent = ''; 
    // document.getElementById('map-container').textContent = ''; 

    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
        // center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 2
      })
    });

    // const map = new Map({
    //   target: 'map',
    //   layers: [
    //     new TileLayer({
    //       source: new OSMSource()
    //     })
    //   ],
    //   view: new View({
    //     center: fromLonLat([coordinates.lng, coordinates.lat]),
    //     // center: fromLonLat([0, 0]),
    //     zoom: 3
    //   })
    // });

    const source = new VectorSource();
    const layer = new VectorLayer({
      source: source
    });
    map.addLayer(layer);

    source.clear(true);
    source.addFeatures([
      // new Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())),
      new Feature(new Point(fromLonLat([coordinates.lng, coordinates.lat])))
    ]);

    map.getView().fit(source.getExtent(), {
      maxZoom: 4,
      duration: 2000
    });

    // modal.hide();
  }
}
