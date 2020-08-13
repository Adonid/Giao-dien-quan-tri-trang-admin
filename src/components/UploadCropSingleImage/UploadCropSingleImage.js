import React, { useLayoutEffect, useRef, useState, forwardRef, useCallback} from 'react';
import ReactCrop from "react-image-crop";
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

 import "react-image-crop/dist/ReactCrop.css";
import { useEffect } from 'react';

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

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 4 / 3 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const firstUpdate = useRef(true);
    useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setOpen(true);
    },[openDialog]);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
        return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
        );
  }, [completedCrop]);

  const handleClose = () => setOpen(false);

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
      }, []);

      useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
          return;
        }
    
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;
    
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
    
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingEnabled = false;
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
    }, [completedCrop]);

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
                                    onChange={ onSelectFile }
                                />
                                <label htmlFor="icon-button-file">
                                    <Button variant="contained" color="secondary" component="span" startIcon={<CloudUploadIcon />}>
                                        Tải lên ảnh avatar
                                    </Button>
                                </label>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Dua crop image o day */}
                            <ReactCrop
                                src={upImg}
                                onImageLoaded={onLoad}
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                            />
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