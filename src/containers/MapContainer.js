import React from 'react';
import { observer, inject } from 'mobx-react';

import Map from '../components/Map';

const MapContainer = inject('houseStore', 'toolbarStore')(
  observer(({ houseStore, toolbarStore }) => (
    <Map
      houses={houseStore.houses.filter(house => {
        return house.zone.name.includes(toolbarStore.searchValueDelayed);
      })}
      addHouseToRoute={house => houseStore.addHouseToRoute(house)}
      removeHouseFromRoute={house => houseStore.removeHouseFromRoute(house)}
      routeData={houseStore.routeData}
    />
  ))
);

export default MapContainer;
