import React, { useEffect, useRef, useState, forwardRef, useCallback} from 'react';
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
 } from '@material-ui/core';
 import CloseIcon from '@material-ui/icons/Close';
 import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux';
import { CLOSE_DIALOG_UPLOAD_IMG } from 'redux/constans';
import { UploadAvatar } from 'redux/actions';

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

const UploadCropImg = props => {

  const { openUploadImg, closeUploadImg, contentUploadImg, uploadAvatar, ...rest } = props;

  const classes = useStyles();

  const [upImg, setUpImg] = useState(contentUploadImg.imageInit);
  const imgRef = useRef('');
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 4 / 3 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const [ dataImage, setDataImage ] = useState('');

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
    
        let image = imgRef.current;
        image.crossOrigin = 'Anonymous';
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

    useEffect( () =>{
        setUpImg(contentUploadImg.imageInit);
    },[contentUploadImg]);

    const sendImageBase64 = () => {
      const dataUpload = {
        uid: contentUploadImg.uid,
        token: contentUploadImg.token,
        base64: dataImage,
      }
      switch (contentUploadImg.type) {
        case 'upload-avatar':
          uploadAvatar(dataUpload);
          break;
      
        default:
          break;
      }
    }

  return (
    <div>
      <Dialog fullScreen open={openUploadImg} onClose={ closeUploadImg } TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={ closeUploadImg } aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h3" color="inherit" className={classes.title}>
                Trình upload ảnh
            </Typography>
            <Button autoFocus color="inherit" disabled={!dataImage} onClick={ sendImageBase64 }>
                Dùng ảnh này
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
                                    <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                                        { contentUploadImg.titleName??"Tải lên ảnh avatar" }
                                    </Button>
                                </label>
                        </Grid>                          
                        <Divider/>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h5" color="inherit" gutterBottom>
                            Ảnh gốc
                          </Typography>
                            <ReactCrop
                                src={ upImg }
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

UploadCropImg.propTypes = {
    openUploadImg : PropTypes.bool.isRequired,
    closeUploadImg : PropTypes.func.isRequired,
    contentUploadImg : PropTypes.object.isRequired,

    uploadAvatar : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    openUploadImg: state.dataMessage.openUploadImg,
    contentUploadImg: state.dataMessage.contentUploadImg,
});

const mapDispatchToProps = dispatch => ({
    closeUploadImg: () => dispatch({type: CLOSE_DIALOG_UPLOAD_IMG}),

    uploadAvatar: dataUpload => dispatch( UploadAvatar(dataUpload) ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadCropImg);