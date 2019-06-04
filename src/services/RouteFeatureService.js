import { Stroke, Style } from 'ol/style.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import OlMapService from './OlMapService';

class HouseFeatureService {
  static createRouteFeatures(routeData) {
    let features = routeData.map(routeDataItem => {
      const routeCoordinates = routeDataItem.latLngs.map(latLng => {
        return OlMapService.lngLatTo3857(latLng.slice().reverse());
      });

      return {
        type: 'Feature',
        geometry: {
          coordinates: routeCoordinates,
          type: 'LineString'
        }
      };
    });

    return new GeoJSON().readFeatures({
      type: 'FeatureCollection',
      features: features
    });
  }

  static routeFeatureStyle(feature) {
    return new Style({
      stroke: new Stroke({
        lineDash: [4],
        color: 'green',
        width: 2
      })
    });
  }
}

export default HouseFeatureService;
