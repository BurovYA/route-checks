import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

class MapToolbar extends Component {
  constructor(props) {
    super(props);
    this.searchValueChangeTimeout = null;
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
  }
  render() {
    return (
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='Menu'
          title={
            this.props.menuButtonPushed
              ? 'Скрыть список домов маршрута'
              : 'Показать список домов маршрута'
          }
          onClick={this.props.menuButtonClick}
        >
          {this.props.menuButtonPushed ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <TextField
          label='Search field'
          type='search'
          margin='normal'
          value={this.props.searchValue}
          onChange={this.handleSearchValueChange}
        />
      </Toolbar>
    );
  }
  handleSearchValueChange(eventData) {
    this.props.onChange(eventData);
  }
}

export default MapToolbar;
