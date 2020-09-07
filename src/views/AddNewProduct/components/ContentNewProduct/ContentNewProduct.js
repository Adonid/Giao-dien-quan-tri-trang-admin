import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { 
    Card, 
    CardContent,
    Grid,
    TextField,
    FormControl,
    Box,
    CardMedia,
    Button,
    CardHeader,
    Divider,
    CardActions,
    Typography
    
 } from '@material-ui/core';
 import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
 import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
 import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import { UploadCropSingleImage, TinyMCE } from 'components';

const useStyles = makeStyles(theme => ({
    root: {},
    titleField: {
        color: '#546e7a'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
        borderRadius: 4,
    },
}));

const buttonAddPhoto = createMuiTheme({
    palette: {
        primary : {
            contrastText: '#fff',
            main: '#9c27b0'
        },
    },
  });

const ContentNewProduct = props => {

    const { className, ...rest } = props;

    const classes = useStyles();

    const [ dataImage, setDataImage ] = useState('/images/products/contemplative-reptile.jpg');
    const [ dataNewImage, setDataNewImage ] = useState(null);
    const [ openUploadImage, setOpenUploadImage ] = useState(false);

    const [ openTinyMCE, setOpenTinyMCE ] = useState(false);

    const [ contentPost, setContentPost ] = useState(false);

    const getDataImage = imgBase64 => {
        setDataNewImage(imgBase64);
        setDataImage(imgBase64);
        // Thuc hien den day coi nhu da them anh bai viet
    };

    const handleContentPost = val => {
        console.log(val);
        setContentPost(val);
    }

    const deleteContent = () => {
        console.log('delete');
        
    }

    return (
        <React.Fragment>
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
            </Card>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    
                    <Card
                        {...rest}
                        className={clsx(classes.root, className)}
                    >
                        <CardContent>
                            <FormControl fullWidth margin="dense">
                                <TextField id="name-post" label="Tên bài viết" type="search" variant="outlined" />
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <TextField
                                    id="description-post"
                                    label="Trích dẫn"
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <Box>
                                    <ThemeProvider theme={buttonAddPhoto}>
                                        <Button 
                                            startIcon={<AddAPhotoOutlinedIcon />}
                                            variant="contained" 
                                            color="primary" 
                                            onClick={ () => setOpenUploadImage(!openUploadImage) }
                                        >
                                            Upload ảnh bài viết
                                        </Button>
                                    </ThemeProvider>
                                </Box>
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <Box>
                                    <CardMedia
                                        className={classes.media}
                                        image={ dataImage }
                                        title="Contemplative Reptile"
                                    />
                                </Box>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
                
                <Grid item xs={12}>
                    <br/>
                    <Card
                        {...rest}
                    >
                        <CardHeader title="Viết nội dung" />
                        <Divider/>
                        <CardContent>
                            {
                                contentPost? <Box>{contentPost}</Box> :<Typography variant="caption">Nội dung bài cần được hoàn thiện, nội dung sẽ được lưu vào bản nháp khi nhấn lưu lại.</Typography>
                            }
                        </CardContent>
                        <Divider/>
                        <CardActions>
                            <ThemeProvider theme={buttonAddPhoto}>
                                <Button 
                                    startIcon={<BorderColorOutlinedIcon />}
                                    variant="contained" 
                                    color="primary" 
                                    onClick={ () => setOpenTinyMCE(!openTinyMCE) }
                                >
                                    Viết bài
                                </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={buttonAddPhoto}>
                                <Button 
                                    startIcon={<DeleteOutlineOutlinedIcon />}
                                    variant="contained" 
                                    color="default" 
                                    onClick={ deleteContent }
                                >
                                    Xóa nội dung
                                </Button>
                            </ThemeProvider>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>
            <UploadCropSingleImage openDialog={openUploadImage} imageInit={dataImage} dataNewImg={ getDataImage} titleName="Tải lên ảnh cho bài viết" />
            <TinyMCE contentInit={ contentPost } openDialog={openTinyMCE} handleContent={ handleContentPost } />
        </React.Fragment>
    );
};

ContentNewProduct.propTypes = {
    
};

export default ContentNewProduct;