import React, { useLayoutEffect, useRef, useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Box, 
    Grid, 
    Card, 
    CardContent,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
 } from '@material-ui/core';
 import CloseIcon from '@material-ui/icons/Close';
 import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
      display: 'none',
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadCropSingleImage = props => {

    const { openDialog, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const firstUpdate = useRef(true);
    useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setOpen(true);
    },[openDialog])

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h3" color="inherit" className={classes.title}>
                Trình upload ảnh
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
                Lưu lại
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                                <input
                                    id="icon-button-file"
                                    accept="image/*"
                                    className={classes.input}
                                    type="file"
                                />
                                <label htmlFor="icon-button-file">
                                    <Button variant="contained" color="secondary" component="span" startIcon={<CloudUploadIcon />}>
                                        Tải lên ảnh avatar
                                    </Button>
                                </label>
                        </Grid>
                        <Grid item xs={12}>
                            
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>

      </Dialog>
    </div>
  );
}

UploadCropSingleImage.propTypes = {
    openDialog : PropTypes.bool.isRequired
}

export default UploadCropSingleImage;