import React from 'react';
import { observer, inject } from 'mobx-react';

import MapToolbar from '../components/MapToolbar';

const MapToolbarContainer = inject('leftPanelStore')(
  observer(({ leftPanelStore }) => (
    <MapToolbar
      menuButtonPushed={leftPanelStore.isVisible}
      menuButtonClick={() => leftPanelStore.toggle()}
      searchValue={leftPanelStore.searchValue}
      onChange={e => {
        leftPanelStore.searchValue = e.target.value;
      }}
    />
  ))
);

export default MapToolbarContainer;
