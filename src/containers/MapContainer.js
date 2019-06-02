import React from 'react';
import { observer, inject } from 'mobx-react';

import Map from '../components/Map';

const MapContainer = inject('houseStore', 'leftPanelStore', 'mapStore')(
  observer(({ houseStore, leftPanelStore, mapStore }) => (
    <Map
      createMap={mapDomElement => {
        return mapStore.createMap(mapDomElement);
      }}
      createLayer={layerData => {
        return mapStore.createHousePoints(layerData);
      }}
      layerData={houseStore.houses.filter(house => {
        return house.zone.name.includes(leftPanelStore.searchValue);
      })}
    />
  ))
);

export default MapContainer;
