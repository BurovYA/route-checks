import React, { Component } from 'react';
import styled from 'styled-components';

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
    this._map = this.props.createMap(this.mapContainer.current);
  }
  componentDidUpdate() {
    if (this._layer) {
      this._map.removeLayer(this._layer);
    }

    this._layer = this.props.createLayer(this.props.layerData);
    this._map.addLayer(this._layer);
  }
}

export default Map;
