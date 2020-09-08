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
                                    plugins: [
                                        'print preview paste importcss searchreplace autolink autosave save',
                                        'directionality code visualblocks visualchars fullscreen image link media',
                                        'template codesample table charmap hr pagebreak nonbreaking anchor toc',
                                        'insertdatetime advlist lists wordcount imagetools textpattern noneditable',
                                        'help charmap quickbars emoticons responsivefilemanager',
                                    ],
                                    toolbar: 'undo redo | bold italic underline strikethrough | ' +
                                            'fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | ' +
                                            'outdent indent |  numlist bullist | forecolor backcolor removeformat | ' +
                                            'pagebreak | charmap emoticons | fullscreen preview print | ' +
                                            'insertfile image media template link anchor codesample | ltr rtl',
                                    autosave_ask_before_unload: true,
                                    autosave_interval: "30s",
                                    autosave_retention: "2m",
                                    a11y_advanced_options: true,
                                    image_caption: true,
                                    image_advtab: true,
                                    // file_picker_types: 'image',  // file image only media
                                    external_filemanager_path: "responsive_filemanager/",
                                    filemanager_title: "Trình quản lý ảnh upload",
                                    external_plugins: {
                                        "responsivefilemanager": "/responsive_filemanager/tinymce/plugins/responsivefilemanager/plugin.min.js",
                                        "filemanager": "/responsive_filemanager/filemanager/plugin.min.js"
                                    },
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
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