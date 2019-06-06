import React, { Component } from 'react';
import { styled } from '@material-ui/styles';

//Map services
import HouseFeatureService from '../services/HouseFeatureService';
import RouteFeatureService from '../services/RouteFeatureService';
import OlLayerSerice from '../services/OlLayerService';
import OlMapService from '../services/OlMapService';
import OlSourceService from '../services/OlSourceService';
import MapboxRouteService from '../services/MapboxRouteService';

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
      40 //clusterDistance
    );
    const houseLayer = OlLayerSerice.createVectorLayer(
      houseClusterSource,
      HouseFeatureService.clusterFeatureStyle
    );
    //В этот источник будут добавлятся сущности домов
    this.houseSource = houseSource;

    //Слой для маршрута
    const routeSource = OlSourceService.createVectorSource([]);
    const routeLayer = OlLayerSerice.createVectorLayer(
      routeSource,
      RouteFeatureService.routeFeatureStyle
    );
    this.routeSource = routeSource;

    //Создание карты
    this.map = OlMapService.createMap({
      layers: [baseLayer, houseLayer, routeLayer],
      target: null,
      controls: controls,
      view: view
    });

    //Подписка на событие клика на карте
    this.map.on('click', eventData => {
      this.map.forEachFeatureAtPixel(eventData.pixel, (feature, layer) => {
        //На карте кластеризованные сущности
        //Получение сущностей входящих в кластер
        const childFeatures = feature.get('features');

        //Проверка на то, что в кластере только одна сущность
        if (!childFeatures || childFeatures.length !== 1) {
          return;
        }

        //Добавление или удаление сущности из маршрута
        let childFeature = childFeatures[0];
        const featureProperties = childFeature.getProperties();
        const house = featureProperties.house;
        if (house.indexInRoute > -1) {
          this.props.removeHouseFromRoute(house);
        } else {
          this.props.addHouseToRoute(house);
        }

        //Получение маршрута
        const routeHouses = this.props.getRouteHouses();
        if (routeHouses.length > 1) {
          MapboxRouteService.getRoute(
            routeHouses.map(house => {
              return house.position;
            })
          )
            .then(data => {
              this.props.setRouteData(data);
            })
            .catch(error => {
              //TODO: обработка ошибки недоступности сервиса mapbox
            });
        } else {
          this.props.setRouteData(null);
        }

        //Установка стиля отображения дома на карте
        feature.setStyle(clusterFeature => {
          return HouseFeatureService.clusterFeatureStyle(clusterFeature);
        });
      });
    });
  }
  _addHousesToMap() {
    this.houseSource.clear();
    this.houseSource.addFeatures(
      HouseFeatureService.createHouseFeatures(this.props.houses)
    );
  }
  _addRouteToMap() {
    this.routeSource.clear();
    if (this.props.routeData) {
      this.routeSource.addFeatures(
        RouteFeatureService.createRouteFeatures(this.props.routeData)
      );
    }
  }
  render() {
    return <OlMapWrapper ref={this.mapContainer} />;
  }
  componentDidMount() {
    //Установка карты в dom
    this.map.setTarget(this.mapContainer.current);

    //Добавление домов на карту
    this._addHousesToMap();
  }
  componentDidUpdate() {
    this._addHousesToMap();
    this._addRouteToMap();
  }
}

export default Map;
