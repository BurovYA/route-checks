import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const MapToolbar = props => {
  return (
    <Toolbar>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='Menu'
        onClick={props.menuButtonClick}
      >
        {props.menuButtonPushed ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </Toolbar>
  );
};

export default MapToolbar;
