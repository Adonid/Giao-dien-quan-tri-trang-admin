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
 import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
 import { UploadCropSingleImage, SelectInput, SelectChips } from 'components';
import { toSlug } from 'helpers';

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
            main: '#4caf50'
        },
    },
  });

const buttonSaveDraft = createMuiTheme({
    palette: {
      primary : {
        main: '#673AB7',
        contrastText: '#fff',
      },
    },
  });

  const schema = {
    name: {
      presence: { allowEmpty: false, message: '^Hãy nhập tên bài viết!' },
      length: {
        maximum: 80,
        minimum: 3,
        message: "^Tên bài ít nhất 3, nhiều nhất 80 ký tự!",
      }
    },
    description: {
        presence: { allowEmpty: false, message: '^Hãy nhập trích dẫn bài viết!' },
      length: {
        maximum: 150,
        minimum: 16,
        message: "^Trích dẫn ít nhất 16, nhiều nhất 150 ký tự!",
      }
    }
  };

const ContentNewProduct = props => {

    const { className, createPost, isLoading, categorys, tags, ...rest } = props;

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
        setLoading(false);
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
        
        setLoading( true );
        var dataPost = {}; 
        dataPost.name = formState.values.name;
        dataPost.description = formState.values.description;
        dataPost.image = dataNewImage??dataImage;
        dataPost.category = idCategory;
        dataPost.tags = idTags;
        dataPost.content = contentPost;

        createPost(dataPost);
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
                                &nbsp;
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
                                &nbsp;
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
                                <SelectInput required={true} fullWidth={true} list={ categorys } label="Danh mục" action={ handleCategory } />
                                <SelectChips fullWidth={ true } list={ tags } handleIdTags={ handleTags } />                  
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
                                        file_picker_types: 'image',  // only image file 
                                        // file_picker_types: 'file image media audio',
                                        file_picker_callback: function (callback, value, meta) {
                                            var input = document.createElement('input');
                                            input.setAttribute('type', 'file');
                                            input.setAttribute('accept', 'audio/*,video/*,image/*');
                                            input.onchange = function () {
                                                var file = input.files[0];
                                                var reader = new FileReader();
                                                reader.onload = function (e) {
                                                    const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
                                                    // Chi chap nhan tai len file: png, jpg, jpeg, gif
                                                    if( (ext==='png' || ext==='jpg' || ext==='jpeg' || ext==='gif') === false){
                                                        callback('', { title: '' });
                                                    }
                                                    
                                                    const nameImage = file.name.substring(0, file.name.lastIndexOf('.') + 1);
                                                    const nameFile = toSlug(nameImage).replace(/(\s+)/g, '-')+'.'+ext;
                                                    // const imgbase64 = reader.result.split(',')[1];
                                                    const base64 = reader.result;
                                                    
                                                    console.log({base64, nameFile});

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
                                startIcon={<VerifiedUserOutlinedIcon />}
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
                        <ThemeProvider theme={buttonSaveDraft}>
                            <Button 
                                startIcon={<AssignmentTurnedInOutlinedIcon />}
                                variant="contained" 
                                color="primary"
                                type="submit"
                                disabled={!formState.isValid||loading}
                            >
                                {loading && <CircularProgress size={24} className={classes.buttonProgress} />} Lưu nháp
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
                    {/* <WindowMannageImage/> */}
                </Grid>
            </form>
            <UploadCropSingleImage openDialog={openUploadImage} imageInit={dataImage} dataNewImg={ getDataImage} titleName="Tải lên ảnh cho bài viết" />
        </React.Fragment>
    );
};

ContentNewProduct.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired,
    categorys: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    
};

const mapStateToProps = state => ({
    isLoading: state.dataManipulationPost.createPost.isLoading,
    categorys: state.dataManipulationPost.categorys,
    tags: state.dataManipulationPost.tags,
})

const mapDispatchToProps = dispatch => ({

    createPost: dataPost => {
        dispatch({
            type: "CREATE_NEW_POST",
            data: dataPost
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentNewProduct)