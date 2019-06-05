import React from 'react';
import { observer, inject } from 'mobx-react';

import MapToolbar from '../components/MapToolbar';

const MapToolbarContainer = inject('toolbarStore', 'houseStore')(
  observer(({ toolbarStore, houseStore }) => (
    <MapToolbar
      menuButtonPushed={toolbarStore.menuButtonPushed}
      menuButtonClick={() => toolbarStore.toggle()}
      clearButtonClick={() => houseStore.clearRoute()}
      searchValue={toolbarStore.searchValue}
      onChange={eventData => {
        toolbarStore.setSearchValue(eventData.target.value);
      }}
    />
  ))
);

export default MapToolbarContainer;
