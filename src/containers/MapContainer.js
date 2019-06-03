import React from 'react';
import { observer, inject } from 'mobx-react';

import Map from '../components/Map';

const MapContainer = inject('houseStore', 'leftPanelStore')(
  observer(({ houseStore, leftPanelStore }) => (
    <Map
      houses={houseStore.houses.filter(house => {
        return house.zone.name.includes(leftPanelStore.searchValue);
      })}
      addHouseToRoute={houseStore.addHouseToRoute}
      removeHouseFromRoute={houseStore.removeHouseFromRoute}
    />
  ))
);

export default MapContainer;
