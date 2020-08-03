import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Snackbars = props => {
  const { data, ...rest} = props;

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  
  /** Khong xuat hien dialog lan dau khi chay. Khoi tao cac useState ve tt ban dau */
  const firstUpdate = useRef(true);
    useLayoutEffect (() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setOpen(true);
    },[data])
  /** End */

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={ open } anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={ data.type }>
          { data.content }
        </Alert>
      </Snackbar>
    </div>
  );
}

Snackbars.propTypes = {
  data: PropTypes.object
}

export default Snackbars;