import React, { Component } from 'react';
import styled from 'styled-components';

import 'ol/ol.css';
import OlMap from 'ol/Map';
import { Tile as TileLayer } from 'ol/layer.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM.js';
import { defaults as defaultControls } from 'ol/control.js';
import { transform } from 'ol/proj';

const MapContainer = styled.div`
  height: 100%;
`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
  }
  render() {
    return <MapContainer ref={this.mapContainer} />;
  }
  componentDidMount() {
    const raster = new TileLayer({
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

    this.olMap = new OlMap({
      layers: [raster],
      target: this.mapContainer.current,
      controls: defaultControls({ zoom: false }),
      view: new View({
        center: transform([37.618423, 55.751244], 'EPSG:4326', 'EPSG:3857'),
        zoom: 8
      })
    });
  }
}

export default Map;