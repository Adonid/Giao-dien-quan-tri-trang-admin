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
    Divider, 
    TextField
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

const pixelRatio = 1;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadCropSingleImage = props => {

  const { openDialog, imageInit, dataNewImg, titleName, dataName, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [upImg, setUpImg] = useState(imageInit);
  const imgRef = useRef('');
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 4 / 3 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const [ dataImage, setDataImage ] = useState('');

  const [ valueInput, setValueInput ] = useState(dataName);
  useEffect(() => {
    setValueInput(dataName);
  },[dataName])

  const firstUpdate = useRef(true);
    useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setOpen(true);
      imgRef.crossOrigin = 'Anonymous';
    },[openDialog]);

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
        ctx.imageSmoothingEnabled = true;
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
        setDataImage(canvas.toDataURL('image/jpeg'));
    }, [completedCrop]);

    const sendImageBase64 = () => {
      dataName ? dataNewImg({ ...valueInput, avatar: dataImage}) : dataNewImg(dataImage);
      setOpen(false);
    }

    const handeChange = val => {
      const newValueInput = { ...valueInput, label: val.target.value };
      setValueInput(newValueInput);
    }
  return (
    <div>
      <Dialog fullScreen open={open} onClose={ () => setOpen(false) } TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={ () => setOpen(false) } aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h3" color="inherit" className={classes.title}>
                Trình upload ảnh
            </Typography>
            <Button autoFocus color="inherit" onClick={ sendImageBase64 }>
                Dùng ảnh này
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={ valueInput ? 6 : 12}>
                                <input
                                    id="icon-button-file"
                                    accept="image/*"
                                    className={classes.input}
                                    type="file"
                                    onChange={ onSelectFile }
                                />
                                <label htmlFor="icon-button-file">
                                    <Button variant="contained" color="secondary" component="span" startIcon={<CloudUploadIcon />}>
                                        { titleName??"Tải lên ảnh avatar" }
                                    </Button>
                                </label>
                        </Grid>
                        {
                          valueInput
                          ?
                            <Grid item xs={12} sm={6}>
                              <TextField
                                autoFocus
                                variant="outlined"
                                label={ valueInput.title }
                                type="text"
                                fullWidth
                                value={ valueInput.label }
                                onChange={ handeChange }
                              />
                            </Grid>
                          :
                            null
                        }
                          
                        <Divider/>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h5" color="inherit" gutterBottom>
                            Ảnh gốc
                          </Typography>
                            <ReactCrop
                                src={ valueInput ? valueInput.avatar : upImg }
                                onImageLoaded={onLoad}
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h5" color="inherit" gutterBottom>
                            Ảnh đã crop
                          </Typography>
                            <div>
                                <canvas
                                ref={previewCanvasRef}
                                style={{
                                    width: completedCrop?.width ?? 0,
                                    height: completedCrop?.height ?? 0
                                }}
                                />
                            </div>
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
    openDialog : PropTypes.bool.isRequired,
    imageInit : PropTypes.string.isRequired,
    dataNewImg : PropTypes.func.isRequired,
    titleName : PropTypes.string,
    dataName : PropTypes.object,
}

export default UploadCropSingleImage;