import { decorate, action, observe } from 'mobx';

//Openlayers
import 'ol/ol.css';
import OlMap from 'ol/Map';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import { Cluster as ClusterSource, Vector as VectorSource } from 'ol/source.js';
import { Circle, RegularShape, Fill, Stroke, Style, Text } from 'ol/style.js';
import { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM.js';
import { defaults as defaultControls } from 'ol/control.js';
import { transform } from 'ol/proj';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

import houseStore from './HouseStore';

const CLUSTER_DISTANCE = 15;
const DEFAULT_MAP_CENTER = [37.618423, 55.751244];

class MapStore {
  _map = null;

  constructor() {
    this._map = null;
    this._styleCache = {};
  }

  createMap(mapDomElement) {
    this._createOlMap(mapDomElement);
    //this._observeHouses();
    this._subscribeToMapEvents();
    return this._map;
  }

  get map() {
    return this._map;
  }

  _createOlMap(mapDomElement) {
    this._map = new OlMap({
      layers: [this._createBaseLayer()],
      target: mapDomElement,
      controls: defaultControls({ zoom: false }),
      view: new View({
        center: this._lngLatTo3857(DEFAULT_MAP_CENTER),
        zoom: 8
      })
    });
  }

  _createBaseLayer() {
    return new TileLayer({
      source: new XYZ({
        url: 'http://{a-c}.tilessputnik.ru/{z}/{x}/{y}.png',
        opaque: false,
        attributions: [
          '<a href="https://maps.sputnik.ru">Спутник</a>',
          '© Ростелеком',
          OSM_ATTRIBUTION
        ]
      })
    });
  }

  _subscribeToMapEvents() {
    this._map.on('click', eventData => {
      this._handleMapClick(eventData);
    });
  }

  _handleMapClick(eventData) {
    this._map.forEachFeatureAtPixel(eventData.pixel, (feature, layer) => {
      const childFeatures = feature.get('features');

      //В маршрут будем добавлять только по одному дому
      if (childFeatures.length !== 1) {
        return;
      }

      let childFeature = childFeatures[0];
      const featureProperties = childFeature.getProperties();
      const house = featureProperties.house;
      if (house.indexInRoute > -1) {
        houseStore.removeHouseFromRoute(house);
      } else {
        houseStore.addHouseToRoute(house);
      }

      feature.setStyle(clusterFeature => {
        return this._clusterFeatureStyle(clusterFeature);
      });
    });
  }

  _observeHouses() {
    observe(houseStore, 'houses', change => {
      //this._createHousePoints(change.newValue);
    });
  }

  createHousePoints(houses) {
    const features = this._createHouseFeatures(houses);
    const vectorSource = this._createVectorSource(features);
    const clusterSource = this._createClusterSource(vectorSource);
    const clusterLayer = this._createClusterLayer(clusterSource);
    return clusterLayer;
    //this._map.addLayer(clusterLayer);
  }

  _createHouseFeatures(houses) {
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

  _createVectorSource(features) {
    return new VectorSource({
      features: features
    });
  }

  _createClusterSource(vectorSource) {
    return new ClusterSource({
      distance: CLUSTER_DISTANCE,
      source: vectorSource
    });
  }

  _createClusterLayer(clusterSource) {
    const clusterLayer = new VectorLayer({
      source: clusterSource,
      style: feature => {
        return this._clusterFeatureStyle(feature);
      }
    });

    return clusterLayer;
  }

  _clusterFeatureStyle(feature) {
    const childFeatures = feature.get('features');
    const size = childFeatures.length;

    let isInRoute = !!childFeatures.find(childFeature => {
      const featureProperties = childFeature.getProperties();
      const house = featureProperties.house;
      return house.indexInRoute > -1;
    });

    let indexInRoute = -1;
    let text = size.toString();
    let strokeColor = '#3399CC';
    if (size === 1) {
      const featureProperties = childFeatures[0].getProperties();
      const house = featureProperties.house;
      strokeColor = house.zoneColor;
      indexInRoute = house.indexInRoute;
      if (indexInRoute > -1) {
        text = (indexInRoute + 1).toString();
      } else {
        text = '';
      }
    }

    let style = this._styleCache[`${size}_${isInRoute}_${indexInRoute}`];
    if (!style) {
      style = new Style({
        image:
          size === 1
            ? this._createSquare(strokeColor, isInRoute)
            : this._createCircle(isInRoute),
        text: this._createText(text)
      });
      this._styleCache[size] = style;
    }
    return style;
  }

  _createCircle(isInRoute) {
    const strokeColor = '#3399CC';
    const fillColor = isInRoute ? '#ffcc80' : '#fff';

    return new Circle({
      radius: 15,
      stroke: new Stroke({
        width: 2,
        color: strokeColor
      }),
      fill: new Fill({
        color: fillColor
      })
    });
  }

  _createSquare(strokeColor, isInRoute) {
    const fillColor = isInRoute ? '#ffcc80' : '#fff';

    return new RegularShape({
      points: 4,
      radius1: 15,
      angle: Math.PI / 2,
      stroke: new Stroke({
        width: 2,
        color: strokeColor
      }),
      fill: new Fill({
        color: fillColor
      })
    });
  }

  _createText(text) {
    return new Text({
      font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
      text: text,
      fill: new Fill({
        color: '#333'
      })
    });
  }

  _lngLatTo3857(lngLat) {
    return transform(lngLat, 'EPSG:4326', 'EPSG:3857');
  }
}

decorate(MapStore, {
  createHousePoints: action,
  createMap: action
});

const mapStore = new MapStore();

export default mapStore;
export { MapStore };
