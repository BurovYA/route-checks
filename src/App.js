import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Box from '@material-ui/core/Box';
import './App.css';

/* containers */
import MapContainer from './containers/MapContainer';
import MapToolbarContainer from './containers/MapToolbarContainer';
import RouteContainer from './containers/RouteContainer';

/* stores */
import houseStore from './stores/HouseStore';
import toolbarStore from './stores/ToolbarStore';

const boxStyle = {
  height: '100%'
};

const relativePos = {
  position: 'relative'
};

const stores = { houseStore, toolbarStore };

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
            <MapContainer />
          </Box>
        </Box>
      </Provider>
    );
  }
}

export default App;
