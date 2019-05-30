import React, { Component } from 'react';
import styled from 'styled-components';

import OlMap from 'ol/Map';
import { Tile as TileLayer } from 'ol/layer.js';
import View from 'ol/View.js';
import { OSM } from 'ol/source.js';

const MapContainer = styled.div`
  height: 100%;
`;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
  }
  render() {
    return <MapContainer ref={this.mapContainer} />;
  }
  componentDidMount() {
    const raster = new TileLayer({
      source: new OSM()
    });

    this.olMap = new OlMap({
      layers: [raster],
      target: this.mapContainer.current,
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }
}
