import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Buttons } from 'elements';

const Confirm = props => {
  const [open, setOpen] = React.useState(false);

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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.note}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Buttons onClick={handleConfirm} color="red" title="Xóa"/>
          <Buttons onClick={handleConfirm} color="blue" title="Lưu lại"/>
          <Buttons onClick={handleConfirm} color="green" title="Lưu lại"/>
          <Buttons onClick={handleClose} color="gray" title="Đóng"/>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Confirm;