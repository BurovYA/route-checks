import React, { Component } from 'react';
import { styled } from '@material-ui/styles';

//Openlayers map services
import HouseFeatureService from '../services/HouseFeatureService';
import OlLayerSerice from '../services/OlLayerService';
import OlMapService from '../services/OlMapService';
import OlSourceService from '../services/OlSourceService';

const OlMapWrapper = styled('div')({
  height: '100%'
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this._initMap();
    this.mapContainer = React.createRef();
  }
  _initMap() {
    //По умолчанию зум 8 и центр на Москву
    const view = OlMapService.createView({
      center: OlMapService.lngLatTo3857([37.618423, 55.751244]),
      zoom: 8
    });

    //Отключение кнопок зума
    const controls = OlMapService.createControls({ zoom: false });

    //Базовый слой (Карта "Спутник")
    const baseLayerSource = OlSourceService.createXYZSource({
      url: 'http://{a-c}.tilessputnik.ru/{z}/{x}/{y}.png',
      opaque: false,
      attributions: [
        '<a href="https://maps.sputnik.ru">Спутник</a>',
        '© Ростелеком'
      ]
    });
    const baseLayer = OlLayerSerice.createTileLayer(baseLayerSource);

    //Кластерный слой для домов
    const houseSource = OlSourceService.createVectorSource([]);
    const houseClusterSource = OlSourceService.createClusterSource(
      houseSource,
      15
    );
    const houseLayer = OlLayerSerice.createClusterLayer(
      houseClusterSource,
      HouseFeatureService.clusterFeatureStyle
    );
    //В этот источник будут добавлятся сущности домов
    this.houseSource = houseSource;

    //Создание карты
    this.map = OlMapService.createMap({
      layers: [baseLayer, houseLayer],
      target: null,
      controls: controls,
      view: view
    });

    //Подписка на событие клика на карте
    this.map.on('click', eventData => {
      this.map.forEachFeatureAtPixel(eventData.pixel, (feature, layer) => {
        const childFeatures = feature.get('features');

        //В маршрут будем добавлять только по одному дому
        if (childFeatures.length !== 1) {
          return;
        }

        let childFeature = childFeatures[0];
        const featureProperties = childFeature.getProperties();
        const house = featureProperties.house;
        if (house.indexInRoute > -1) {
          this.props.removeHouseFromRoute(house);
        } else {
          this.props.addHouseToRoute(house);
        }

        feature.setStyle(clusterFeature => {
          return HouseFeatureService.clusterFeatureStyle(clusterFeature);
        });
      });
    });
  }
  render() {
    return <OlMapWrapper ref={this.mapContainer} />;
  }
  componentDidMount() {
    //Установка карты в dom
    this.map.setTarget(this.mapContainer.current);
  }
  componentDidUpdate(prevProps) {
    this.houseSource.clear();
    this.houseSource.addFeatures(
      HouseFeatureService.createHouseFeatures(this.props.houses)
    );
  }
}

export default Map;
