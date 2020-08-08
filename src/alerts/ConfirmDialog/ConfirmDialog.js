import React, { useEffect } from 'react';
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

  const { content, openDialog, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = React.useState(openDialog);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    // Xu ly hande chap nhan o day. Hoac truyen len store de xu ly
    console.log('ok');
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
  content : PropTypes.object,
  openDialog : PropTypes.bool
}

export default ConfirmDialog;