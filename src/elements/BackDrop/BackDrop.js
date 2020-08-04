import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const BackDrop = props => {
  const { open, ...rest} = props;
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
      </Backdrop>
    </div>
  );
}

BackDrop.propsTypes = {
  open : PropTypes.boolean
  // open la trang thai disable viec click vao man hinh trong khi dang goi api
}

export default BackDrop;