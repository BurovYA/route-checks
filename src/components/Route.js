import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';

const StyledList = styled(List)(({ theme }) => ({
  width: 460,
  backgroundColor: theme.palette.background.paper
}));

const Route = props => {
  let index = 0;
  const listItems = props.houses.map(house => (
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
      open={props.visible}
      PaperProps={{
        style: { position: 'absolute' }
      }}
    >
      <StyledList>
        <ListItem alignItems="center" key={'route-distance'}>
          <ListItemText primary={`Длина маршрута: ${props.routeDistance} м`} />
        </ListItem>
        {listItems.length === 0 && (
          <ListItem alignItems="center" key={'no-data'}>
            <ListItemText primary={'Ни одного дома не добавлено'} />
          </ListItem>
        )}
        {listItems}
      </StyledList>
    </Drawer>
  );
};

export default Route;
