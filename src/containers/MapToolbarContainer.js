import React from 'react';
import { observer, inject } from 'mobx-react';

import MapToolbar from '../components/MapToolbar';

const MapToolbarContainer = inject('routeStore')(
  observer(({ routeStore }) => (
    <MapToolbar
      menuButtonPushed={routeStore.isVisible}
      menuButtonClick={() => routeStore.toggle()}
    />
  ))
);

export default MapToolbarContainer;
