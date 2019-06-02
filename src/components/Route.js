import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    width: 460,
    backgroundColor: theme.palette.background.paper
  }
}));

const Route = props => {
  const classes = useStyles();

  let index = 0;
  const listItems = props.houses.map(house => (
    <ListItem alignItems='flex-start' key={index++}>
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
      anchor='left'
      variant='persistent'
      open={props.visible}
      PaperProps={{
        style: { position: 'absolute' }
      }}
    >
      <List className={classes.list}>
        {listItems.length === 0 && (
          <ListItem alignItems='center' key={'no-data'}>
            <ListItemText primary={'Ни одного дома не добавлено'} />
          </ListItem>
        )}
        {listItems}
      </List>
    </Drawer>
  );
};

export default Route;
