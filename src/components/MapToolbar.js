import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const MapToolbar = props => {
  return (
    <Toolbar>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='Menu'
        title={
          props.menuButtonPushed
            ? 'Скрыть список домов маршрута'
            : 'Показать список домов маршрута'
        }
        onClick={props.menuButtonClick}
      >
        {props.menuButtonPushed ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <TextField
        label='Search field'
        type='search'
        margin='normal'
        value={props.searchValue}
        onChange={props.onChange}
      />
    </Toolbar>
  );
};

export default MapToolbar;
