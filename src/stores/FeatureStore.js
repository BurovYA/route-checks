import { decorate, action } from 'mobx';

//Openlayers
import { transform } from 'ol/proj';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

class FeatureStore {
  constructor() {
    this._styleCache = {};
  }

  createHouseFeatures(houses) {
    let features = [];
    for (let house of houses) {
      let position = house.position;
      let coordinates = this._lngLatTo3857([position[1], position[0]]);

      let feature = new Feature(new Point(coordinates));
      feature.setProperties({
        house: house
      });

      features.push(feature);
    }

    return features;
  }

  _lngLatTo3857(lngLat) {
    return transform(lngLat, 'EPSG:4326', 'EPSG:3857');
  }
}

decorate(FeatureStore, {
  createHouseFeatures: action
});

const featureStore = new FeatureStore();

export default featureStore;
export { FeatureStore };
