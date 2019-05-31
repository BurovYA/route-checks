import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import Box from '@material-ui/core/Box';
import Map from './components/Map';

import RouteContainer from './containers/RouteContainer';
import MapToolbarContainer from './containers/MapToolbarContainer';
import './App.css';

/* stores */
import routeStore from './stores/RouteStore';

const boxStyle = {
  height: '100%'
};

const relativePos = {
  position: 'relative'
};

const stores = { routeStore };

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Box
          display='flex'
          flexDirection='column'
          justify='flex-start'
          alignItems='stretch'
          style={boxStyle}
        >
          <Box>
            <MapToolbarContainer />
          </Box>
          <Box flexGrow={1} minHeight={0} style={relativePos}>
            <RouteContainer />
            <Map />
          </Box>
        </Box>
      </Provider>
    );
  }
}

export default App;
