import React from 'react';
import { observer, inject } from 'mobx-react';

import Route from '../components/Route';

const RouteContainer = inject('routeStore')(
  observer(({ routeStore }) => (
    <Route container={routeStore.container} visible={routeStore.visible} />
  ))
);

export default RouteContainer;
