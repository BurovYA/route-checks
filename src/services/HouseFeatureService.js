import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { Circle, RegularShape, Fill, Stroke, Style, Text } from 'ol/style.js';
import OlMapService from './OlMapService';

let styleCache = {};

class HouseFeatureService {
  static createHouseFeatures(houses) {
    let features = [];
    for (let house of houses) {
      let position = house.position;
      let coordinates = OlMapService.lngLatTo3857([position[1], position[0]]);

      let feature = new Feature(new Point(coordinates));
      feature.setProperties({
        house: house
      });

      features.push(feature);
    }

    return features;
  }

  static clusterFeatureStyle(feature) {
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

    let style = styleCache[`${size}_${isInRoute}_${indexInRoute}`];
    if (!style) {
      style = new Style({
        image:
          size === 1
            ? HouseFeatureService.createSquare(strokeColor, isInRoute)
            : HouseFeatureService.createCircle(isInRoute),
        text: HouseFeatureService.createText(text)
      });
      styleCache[size] = style;
    }
    return style;
  }

  static createCircle(isInRoute) {
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

  static createSquare(strokeColor, isInRoute) {
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

  static createText(text) {
    return new Text({
      font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
      text: text,
      fill: new Fill({
        color: '#333'
      })
    });
  }
}

export default HouseFeatureService;
