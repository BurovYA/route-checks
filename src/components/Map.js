import React, { Component } from 'react';

//Openlayers map services
import HouseFeatureService from '../services/HouseFeatureService';
import OlLayerSerice from '../services/OlLayerService';
import OlMapService from '../services/OlMapService';
import OlSourceService from '../services/OlSourceService';

//TODO: везде использовать одинаковую библиотеку для StyledComponents
import styled from 'styled-components';

const MapContainer = styled.div`
  height: 100%;
`;

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
  }
  render() {
    return <MapContainer ref={this.mapContainer} />;
  }
  componentDidMount() {
    //Установка карты в dom
    this.map.setTarget(this.mapContainer.current);
  }
  componentDidUpdate(prevProps) {
    console.log('updated');

    this.houseSource.clear();
    this.houseSource.addFeatures(
      HouseFeatureService.createHouseFeatures(this.props.houses)
    );

    //console.log(this.props.houses);
    /*
    if (this._layer) {
      this._map.removeLayer(this._layer);
    }

    this._layer = this.props.createLayer(this.props.layerData);
    this._map.addLayer(this._layer);
    */
  }
}

export default Map;
