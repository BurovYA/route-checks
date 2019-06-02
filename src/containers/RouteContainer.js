import React from 'react';
import { observer, inject } from 'mobx-react';

import Route from '../components/Route';

const RouteContainer = inject('houseStore', 'leftPanelStore')(
  observer(({ houseStore, leftPanelStore }) => (
    <Route
      visible={leftPanelStore.visible}
      houses={houseStore.routeHouses.slice()}
    />
  ))
);

export default RouteContainer;
