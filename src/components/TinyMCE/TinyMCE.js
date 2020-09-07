import React, { useState, useRef, useLayoutEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';
import { 
    Box, 
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


 const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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

const TinyMCE = props => {

    const { contentInit, handleContent, openDialog, ...rest} = props;

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [contentPost, setContentPost] = useState(false);

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setOpen(true);
    },[openDialog]);

    const sendConentPost = () => {
        setOpen(false);
        handleContent(contentPost);
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
                        Nội dung bài viết
                    </Typography>
                    <Button autoFocus color="inherit" onClick={ sendConentPost }>
                        Lưu lại
                    </Button>
                </Toolbar>
                </AppBar>
                <Box>
                    <Card>
                        <CardContent>
                            <Editor
                                apiKey="g6j5aqzhhcuqyw9tlkubpsl1x1hd0l0ze7exfz3id0xqxs97"
                                initialValue={ contentInit }
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview print | insertfile image media template link anchor codesample | ltr rtl',
                                    toolbar_sticky: false,
                                    autosave_ask_before_unload: true,
                                    autosave_interval: "30s",
                                    autosave_prefix: "{path}{query}-{id}-",
                                    autosave_restore_when_empty: false,
                                    autosave_retention: "2m",
                                    a11y_advanced_options: true,
                                    image_advtab: true,
                                    image_caption: true,
                                    image_list: [
                                        {title: '<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="nice" />', value: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
                                        {title: 'My image 2', value: 'https://i.ytimg.com/an_webp/qCdE6IL62yQ/mqdefault_6s.webp?du=3000&sqp=CNDAi_cF&rs=AOn4CLB1spjuimjOpVyQsCRICCHRObjWRw' }
                                    ],
                                    image_class_list: [
                                        { title: 'None', value: '' },
                                        { title: 'Some class', value: 'img-fluid rounded' }
                                    ],
                                    // file_picker_types: 'image',  // file image media
                                    automatic_uploads: false,
                                    file_picker_callback: function (callback, value, meta) {
                                        /* Provide file and text for the link dialog */
                                        if (meta.filetype === 'file') {
                                        callback('https://www.youtube.com/watch?v=JHHYXN52oUo&list=RDJHHYXN52oUo&start_radio=1', { text: 'My text' });
                                        }
                                        /* Provide image and alt text for the image dialog */
                                        if (meta.filetype === 'image') {
                                            var input = document.createElement('input');
                                            input.setAttribute('type', 'file');
                                            input.setAttribute('accept', 'image/*');

                                            /*
                                            Note: In modern browsers input[type="file"] is functional without
                                            even adding it to the DOM, but that might not be the case in some older
                                            or quirky browsers like IE, so you might want to add it to the DOM
                                            just in case, and visually hide it. And do not forget do remove it
                                            once you do not need it anymore.
                                            */
                                            input.onchange = function () {
                                            var file = this.files[0];
                                            var reader = new FileReader();
                                            reader.addEventListener("load", function () {
                                                /*
                                                Note: Now we need to register the blob in TinyMCEs image blob
                                                registry. In the next release this part hopefully won't be
                                                necessary, as we are looking to handle it internally.
                                                */                                   
                                                const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
                                                console.log(ext);
                                                
                                                const imgbase64 = reader.result.split(',')[1];
                                                console.log(imgbase64);

                                            /* Call AXIOS -> API HERE */
                                            
                                            /* call the callback and populate the Title field with the file name */
                                                callback('url_image_from_API', { title: file.name });
                                            });
                                            reader.readAsDataURL(file);
                                            };
                                            input.click();
                                        }
                                        /* Provide alternative source and posted for the media dialog */
                                        if (meta.filetype === 'media') {
                                        callback('https://www.youtube.com/watch?v=JHHYXN52oUo&list=RDJHHYXN52oUo&start_radio=1', { source2: 'alt.ogg', poster: 'https://www.youtube.com/watch?v=JHHYXN52oUo&list=RDJHHYXN52oUo&start_radio=1' });
                                        }
                                    },
                                }}
                                onChange={e => setContentPost(e.target.getContent())}
                            />
                        </CardContent>
                    </Card>
                </Box>

            </Dialog>
        </div>
    );
};

TinyMCE.propTypes = {
    contentInit: PropTypes.string.isRequired,
    openDialog : PropTypes.bool.isRequired,
    handleContent : PropTypes.func.isRequired,
};

export default TinyMCE;