import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography 
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {},
  buttonDelete: {
    color: "#dc004e",
    border: '1px solid #dc004e80'
  },
  buttonClose: {
    color: "#00000042"
  }
}));

const ConfirmDialog = props => {

  const { action, content, openDialog, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(openDialog);

  const firstUpdate = useRef(true);
  useLayoutEffect (() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setOpen(true);
  },[openDialog]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    action();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h4">
            { content.title }
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { content.note }
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        <Button 
          className={ classes.buttonDelete } 
          variant="outlined" 
          size="small" 
          startIcon={<DeleteIcon />}
          onClick={ handleConfirm }
        >
          Xóa
        </Button>

        <Button 
          className={ classes.buttonClose } 
          variant="text" 
          size="small" 
          onClick={ handleClose }
        >
          Đóng
        </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmDialog.propTypes = {
  action : PropTypes.func,
  content : PropTypes.object,
  openDialog : PropTypes.bool
}

export default ConfirmDialog;