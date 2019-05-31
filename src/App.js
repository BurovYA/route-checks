import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Map from './components/Map';
import './App.css';

const boxStyle = {
  height: '100%'
};

const relativePos = {
  position: 'relative'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRoutes: false
    };

    this.drawerContainer = React.createRef();
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }
  menuButtonClick(e) {
    this.setState(state => ({
      showRoutes: !state.showRoutes
    }));
  }
  render() {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justify="flex-start"
        alignItems="stretch"
        style={boxStyle}
      >
        <Box>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Menu"
              onClick={this.menuButtonClick}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Box>
        <Box
          flexGrow={1}
          minHeight={0}
          ref={this.drawerContainer}
          style={relativePos}
        >
          <Drawer
            anchor="left"
            variant="persistent"
            open={this.state.showRoutes}
            PaperProps={{
              style: { position: 'absolute' }
            }}
            ModalProps={{
              container: this.drawerContainer.current
            }}
          >
            saddsadsa
          </Drawer>
          <Map />
        </Box>
      </Box>
    );
  }
}

export default App;
