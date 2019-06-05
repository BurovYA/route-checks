import bbox from '@turf/bbox';
import { randomPoint } from '@turf/random';

const HOUSE_COUNT = 50;
const ZONES = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.55946636199951, 55.72019767205755],
            [37.57766246795654, 55.72019767205755],
            [37.57766246795654, 55.72749675732418],
            [37.55946636199951, 55.72749675732418],
            [37.55946636199951, 55.72019767205755]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.56800651550293, 55.728946744262515],
            [37.588176727294915, 55.728946744262515],
            [37.588176727294915, 55.73643748562126],
            [37.56800651550293, 55.73643748562126],
            [37.56800651550293, 55.728946744262515]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.5787353515625, 55.73745224969486],
            [37.60148048400879, 55.73745224969486],
            [37.60148048400879, 55.745762657730495],
            [37.5787353515625, 55.745762657730495],
            [37.5787353515625, 55.73745224969486]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.60894775390625, 55.72068109737315],
            [37.63649940490723, 55.72068109737315],
            [37.63649940490723, 55.73087997641518],
            [37.60894775390625, 55.73087997641518],
            [37.60894775390625, 55.72068109737315]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.59864807128906, 55.70873874051673],
            [37.62825965881348, 55.70873874051673],
            [37.62825965881348, 55.71981092749662],
            [37.59864807128906, 55.71981092749662],
            [37.59864807128906, 55.70873874051673]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.61152267456054, 55.732474820874856],
            [37.638559341430664, 55.732474820874856],
            [37.638559341430664, 55.74440992120792],
            [37.61152267456054, 55.74440992120792],
            [37.61152267456054, 55.732474820874856]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.57890701293945, 55.69026199416489],
            [37.61838912963867, 55.69026199416489],
            [37.61838912963867, 55.70419291679782],
            [37.57890701293945, 55.70419291679782],
            [37.57890701293945, 55.69026199416489]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.53650665283203, 55.68910085982751],
            [37.57238388061523, 55.68910085982751],
            [37.57238388061523, 55.704579816001036],
            [37.53650665283203, 55.704579816001036],
            [37.53650665283203, 55.68910085982751]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.57495880126953, 55.7517527843269],
            [37.60465621948242, 55.7517527843269],
            [37.60465621948242, 55.76537206761647],
            [37.57495880126953, 55.76537206761647],
            [37.57495880126953, 55.7517527843269]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [37.54199981689453, 55.75532709909638],
            [37.57169723510742, 55.75532709909638],
            [37.57169723510742, 55.76788290546831],
            [37.54199981689453, 55.76788290546831],
            [37.54199981689453, 55.75532709909638]
          ]
        ]
      }
    }
  ]
};

class TestDataService {
  static getTestData() {
    let testData = [];
    let zoneIndex = 1;

    ZONES.features.forEach(feature => {
      const zoneBbox = bbox(feature);
      const points = randomPoint(HOUSE_COUNT, { bbox: zoneBbox });
      let houseNumber = 1;

      points.features.forEach(pointFeature => {
        testData.push({
          address: `<Город> <Улица> <Дом> ${houseNumber}`,
          position: pointFeature.geometry.coordinates.slice().reverse(),
          date: '22.07.2014',
          zone: {
            name: `CЭ-${zoneIndex}`,
            chief: {
              name: 'Фамилия Имя Отчество',
              photo: ''
            }
          }
        });
        houseNumber++;
      });

      zoneIndex++;
    });

    return testData;
  }
}

export default TestDataService;
