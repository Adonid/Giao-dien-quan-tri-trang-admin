import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider, useTheme  } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
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
    Divider
    
 } from '@material-ui/core';
 import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
 import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
 import { UploadCropSingleImage, SelectInput, SelectChips } from 'components';

const useStyles = makeStyles(theme => ({
    root: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
        borderRadius: 4,
    }
}));

const buttonAddPhoto = createMuiTheme({
    palette: {
        primary : {
            contrastText: '#fff',
            main: '#9c27b0'
        },
    },
  });
const buttonStore = createMuiTheme({
    palette: {
        primary : {
            contrastText: '#fff',
            main: '#5850EC'
        },
    },
  });

  const lists = [
    {
      value: '0',
      label: 'Chọn danh mục',
    },
    {
      value: '1',
      label: 'Sức khỏe',
    },
    {
      value: '2',
      label: 'Du lịch',
    },
    {
      value: '3',
      label: 'Khoa học',
    },
  ];

  const names = [
    {
        id: 1,
        label: "Sinh nhật"
    },
    {
        id: 2,
        label: "Trung Thu"
    },
    {
        id: 3,
        label: "Tết cổ truyền"
    },
    {
        id: 4,
        label: "Múa rối nước"
    },
    {
        id: 5,
        label: "Đua xe F1"
    },
  ];

const ContentNewProduct = props => {

    const { className, ...rest } = props;

    const classes = useStyles();

    const [ dataImage, setDataImage ] = useState('/images/products/contemplative-reptile.jpg');
    const [ dataNewImage, setDataNewImage ] = useState(null);
    const [ openUploadImage, setOpenUploadImage ] = useState(false);

    const [ contentPost, setContentPost ] = useState('');

    const getDataImage = imgBase64 => {
        setDataNewImage(imgBase64);
        setDataImage(imgBase64);
        // Thuc hien den day coi nhu da them anh bai viet
    };

    const handlePost = () => {
        console.log(contentPost);
    }

    const deleteContent = () => {
        console.log('delete');
        
    }
    
    const handleCategory = val => {
        console.log(val);
        
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
                        <CardHeader title="Giới thiệu bài viết" />
                        <Divider/>
                        <CardContent>
                            <FormControl fullWidth margin="dense">
                                <TextField 
                                    required 
                                    id="name-post" 
                                    label="Tên bài viết" 
                                    type="search" 
                                    variant="outlined" 
                                />
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <TextField
                                    required
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
                    <Card
                        {...rest}
                        className={clsx(classes.root, className)}
                    >
                        <CardHeader title="Tổ chức bài viết" />
                        <Divider/>
                        <CardContent>
                            <SelectInput required={true} fullWidth={true} list={ lists } label="Danh mục" action={ handleCategory } />
                            <SelectChips fullWidth={ true } list={ names } />                  
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12}>
                    <br/>
                    <Card
                        {...rest}
                    >
                        <CardHeader title="Viết nội dung" />
                        <Divider/>
                        <CardContent>
                            <Editor
                                apiKey="g6j5aqzhhcuqyw9tlkubpsl1x1hd0l0ze7exfz3id0xqxs97"
                                initialValue={ contentPost }
                                init={{
                                    height: 500,
                                    menubar: true,
                                    placeholder: "Aa...",
                                    plugins: [
                                        "advlist autolink lists link image charmap print preview anchor fullscreen preview ",
                                        "searchreplace  code fullscreen image code codesample ",
                                        "insertdatetime media table paste code help wordcount",
                                    ],
                                    toolbar:
                                        // eslint-disable-next-line no-multi-str
                                        "undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist | \
                                        outdent indent | \
                                        image media table link codesample | \
                                        fullscreen preview | \
                                        | help",
                                        // Them vao cho cong thuc toan va hoa : tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry
                                    a11y_advanced_options: true,
                                    image_caption: true,
                                    image_advtab: true,
                                    // file_picker_types: 'image',  // only image file 
                                    file_picker_types: 'file image media audio',
                                    file_picker_callback: function (callback, value, meta) {
                                        var input = document.createElement('input');
                                        input.setAttribute('type', 'file');
                                        input.setAttribute('accept', 'audio/*,video/*,image/*');
                                        input.onchange = function () {
                                            var file = input.files[0];
                                            var reader = new FileReader();
                                            reader.onload = function (e) {
                                                const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
                                                console.log(ext);
                                                
                                                const imgbase64 = reader.result.split(',')[1];
                                                console.log(imgbase64);

                                            /* Call AXIOS -> API HERE */
                                            
                                            /* call the callback and populate the Title field with the file name */
                                                callback('link_img_sau_khi_api_tra_ve', { title: file.name });
                                            };
                                            reader.readAsDataURL(file);
                                        };
                                        input.click();
                                    },
                                    // external_filemanager_path: "responsive_filemanager/",
                                    filemanager_title: "Trình quản lý upload",
                                    external_plugins: {
                                        // "responsivefilemanager": "/responsive_filemanager/tinymce/plugins/responsivefilemanager/plugin.min.js",
                                        // "filemanager": "/responsive_filemanager/filemanager/plugin.min.js"
                                        // 'tiny_mce_wiris': 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js'
                                    },
                                }}
                                onEditorChange={ (content, editor) => { setContentPost(content) } }
                            />
                        </CardContent>
                    </Card>
                </Grid>
                &nbsp;
                <Grid item xs={12}>
                    <ThemeProvider theme={buttonStore}>
                        <Button 
                            startIcon={<AssignmentTurnedInOutlinedIcon />}
                            variant="contained" 
                            color="primary" 
                            onClick={ handlePost }
                        >
                            Lưu, chờ duyệt
                        </Button>
                    </ThemeProvider>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <ThemeProvider theme={buttonAddPhoto}>
                        <Button 
                            variant="contained" 
                            color="default" 
                            onClick={ deleteContent }
                        >
                            Bỏ qua
                        </Button>
                    </ThemeProvider>
                </Grid>

            </Grid>
            <UploadCropSingleImage openDialog={openUploadImage} imageInit={dataImage} dataNewImg={ getDataImage} titleName="Tải lên ảnh cho bài viết" />
        </React.Fragment>
    );
};

ContentNewProduct.propTypes = {
    
};

export default ContentNewProduct;