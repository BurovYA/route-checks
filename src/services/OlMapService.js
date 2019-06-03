import 'ol/ol.css';
import { defaults as defaultControls } from 'ol/control.js';
import OlMap from 'ol/Map';
import { transform } from 'ol/proj';
import View from 'ol/View.js';

class OlMapService {
  static createMap(options) {
    return new OlMap(options);
  }

  static createView(options) {
    return new View(options);
  }

  static createControls(options) {
    return defaultControls(options);
  }

  static lngLatTo3857(lngLat) {
    return transform(lngLat, 'EPSG:4326', 'EPSG:3857');
  }
}

export default OlMapService;
