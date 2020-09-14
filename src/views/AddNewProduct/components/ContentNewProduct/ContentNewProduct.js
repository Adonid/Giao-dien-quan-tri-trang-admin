import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import validate from 'validate.js';
import { createMuiTheme, makeStyles, ThemeProvider  } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
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
    CircularProgress
    
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

  const schema = {
    name: {
      presence: { allowEmpty: false, message: '^Hãy nhập tên bài viết!' },
      length: {
        maximum: 50,
        message: "^Tối đa 50 ký tự!",
        minimum: 3,
        message: "^Tối thiểu 3 ký tự",
      }
    },
    description: {
        presence: { allowEmpty: false, message: '^Hãy nhập trích dẫn bài viết!' },
      length: {
        maximum: 150,
        message: "^Trích dẫn cần tối đa 150 ký tự",
        minimum: 16,
        message: "^Trích dẫn cần tối thiểu 16 ký tự",
      }
    }
  };

const ContentNewProduct = props => {

    const { className, createPost, isLoading, ...rest } = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });

      useEffect(() => {
        const errors = validate(formState.values, schema);
    
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {}
        }));
      }, [formState.values]);

      useEffect(() => {
        setLoading(isLoading);
        }, [isLoading]);

      const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]:
              event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
          },
          touched: {
            ...formState.touched,
            [event.target.name]: true
          }
        }));
      };
    
    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const [ loading, setLoading ] = useState( false );

    const [ dataImage, setDataImage ] = useState('/images/products/contemplative-reptile.jpg');
    const [ dataNewImage, setDataNewImage ] = useState(null);
    const [ openUploadImage, setOpenUploadImage ] = useState(false);

    const [ contentPost, setContentPost ] = useState('');
    const [ idCategory, setIdCategory ] = useState(0);
    const [ idTags, setIdTags ] = useState([]);

    const getDataImage = imgBase64 => {
        setDataNewImage(imgBase64);
        setDataImage(imgBase64);
    };

    const deleteContent = () => {
        console.log('delete');
        
    }
    
    const handleCategory = val => setIdCategory(val);

    const handleTags = tags => setIdTags(tags);

    const handlePost = event => {
        event.preventDefault();
        /** API xu ly dang nhap o day */

        /** END */
        setLoading( true );
        var dataPost = {}; 
        dataPost.name = formState.values.name;
        dataPost.description = formState.values.description;
        dataPost.image = dataNewImage??dataImage;
        dataPost.category = idCategory;
        dataPost.tags = idTags;
        dataPost.content = contentPost;

        createPost(dataPost);
        // console.log(contentPost);
        // createPost(data)
    }

    return (
        <React.Fragment>
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
            </Card>
            <form onSubmit={ handlePost } >
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
                                        name="name"
                                        label="Tên bài viết" 
                                        type="search" 
                                        variant="outlined"
                                        error={hasError('name')}
                                        helperText={
                                            hasError('name') ? formState.errors.name[0] : null
                                          }
                                        value={formState.values.name || ''}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="dense">
                                    <TextField
                                        required
                                        id="description-post"
                                        label="Trích dẫn"
                                        name="description"
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        error={hasError('description')}
                                        helperText={
                                            hasError('description') ? formState.errors.description[0] : null
                                          }
                                        value={formState.values.description || ''}
                                        onChange={handleChange}
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
                                <SelectChips fullWidth={ true } list={ names } handleIdTags={ handleTags } />                  
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
                                type="submit"
                                disabled={!formState.isValid||loading}
                            >
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />} Lưu, chờ duyệt
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
            </form>
            <UploadCropSingleImage openDialog={openUploadImage} imageInit={dataImage} dataNewImg={ getDataImage} titleName="Tải lên ảnh cho bài viết" />
        </React.Fragment>
    );
};

ContentNewProduct.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.dataManipulationPost.createPost.isLoading,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createPost: dataPost => {
            dispatch({
                type: "CREATE_NEW_POST",
                data: dataPost
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentNewProduct)