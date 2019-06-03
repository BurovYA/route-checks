import React from 'react';
import { observer, inject } from 'mobx-react';

import Route from '../components/Route';

const RouteContainer = inject('houseStore', 'toolbarStore')(
  observer(({ houseStore, toolbarStore }) => (
    <Route
      visible={toolbarStore.menuButtonPushed}
      houses={houseStore.routeHouses.slice()}
    />
  ))
);

export default RouteContainer;
