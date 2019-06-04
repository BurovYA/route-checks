import React from 'react';
import { observer, inject } from 'mobx-react';

import MapToolbar from '../components/MapToolbar';

const MapToolbarContainer = inject('toolbarStore')(
  observer(({ toolbarStore }) => (
    <MapToolbar
      menuButtonPushed={toolbarStore.menuButtonPushed}
      menuButtonClick={() => toolbarStore.toggle()}
      searchValue={toolbarStore.searchValue}
      onChange={eventData => {
        toolbarStore.setSearchValue(eventData.target.value);
      }}
    />
  ))
);

export default MapToolbarContainer;
