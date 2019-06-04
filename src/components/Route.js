import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import MapboxRouteService from '../services/MapboxRouteService';

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  width: 460,
  backgroundColor: theme.palette.background.paper
}));

class Route extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let index = 0;
    const listItems = this.props.houses.map(house => (
      <ListItem alignItems="flex-start" key={index++}>
        <div
          style={{
            backgroundColor: house.zoneColor,
            flex: '0 0 50px',
            textAlign: 'center',
            marginTop: '16px',
            marginRight: '16px',
            padding: '4px',
            borderRadius: '4px',
            color: '#fff'
          }}
        >
          {house.zone.name}
        </div>
        <ListItemText
          primary={house.address}
          secondary={'Дата последней проверки: ' + house.date}
        />
        <ListItemAvatar>
          <PersonIcon />
        </ListItemAvatar>
      </ListItem>
    ));

    return (
      <Drawer
        anchor="left"
        variant="persistent"
        open={this.props.visible}
        PaperProps={{
          style: { position: 'absolute' }
        }}
      >
        <StyledList>
          {listItems.length === 0 && (
            <ListItem alignItems="center" key={'no-data'}>
              <ListItemText primary={'Ни одного дома не добавлено'} />
            </ListItem>
          )}
          {listItems}
        </StyledList>
      </Drawer>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.houses.length > 1) {
      MapboxRouteService.getRoute(
        this.props.houses.map(house => {
          return house.position;
        })
      ).then(data => {
        this.props.setRouteData(data);
      });
    } else {
      this.props.setRouteData(null);
    }
  }
}

export default Route;
