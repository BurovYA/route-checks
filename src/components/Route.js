import React from 'react';
import Drawer from '@material-ui/core/Drawer';

const Route = props => (
  <Drawer
    anchor='left'
    variant='persistent'
    open={props.visible}
    PaperProps={{
      style: { position: 'absolute' }
    }}
    ModalProps={{
      container: props.container
    }}
  >
    saddsadsa
  </Drawer>
);

export default Route;
