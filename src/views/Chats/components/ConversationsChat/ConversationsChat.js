import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { 
    Paper, 
    Card, 
    CardHeader,
    Typography,
    Divider,
    Box,
    Avatar,
    CardContent,
    CardActions,
    TextField,
    Tooltip
 } from '@material-ui/core';
 import IconButton from '@material-ui/core/IconButton';
 import MoreVertIcon from '@material-ui/icons/MoreVert';
 import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
 import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
 import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import { UploadCropSingleImage } from 'components';

 const useStyles = makeStyles(theme => ({
    root: {
      
    },
    avatar: {
        backgroundColor: red[500],
        textTransform: 'uppercase'
      },
    avatarSmall: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    actions: {
        padding: theme.spacing(1),
        width: '100%',
        justifyContent: 'end',
        '& .MuiCardHeader-content': {
            flex: 'none'
        }
    },
    formMessange: {

    },
    areaContent: {
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(29)
        },
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(39)
        },
        [theme.breakpoints.up('md')]: {
            width: theme.spacing(71)
        },
        [theme.breakpoints.up('lg')]: {
            width: theme.spacing(81)
        },
    },
    divider: {
        display: 'inline-block',
        width: 1,
        height: theme.spacing(3),
        position: 'relative',
        top: theme.spacing(1),
        backgroundColor: '#0000001f'
    },
    rotate45deg: {
        transform: 'rotateZ(-40deg)'
    },
    contentCard: {
        [theme.breakpoints.down('xs')]: {
            maxHeight: 812-252,
          },
          [theme.breakpoints.up('sm')]: {
            maxHeight: 1024-252,
          },
          [theme.breakpoints.up('md')]: {
            maxHeight: 1150-252,
          },
        backgroundColor: '#f4f6f8',
    },
    itemSay: {
        position: 'relative',
        paddingLeft: 0,
        paddingRight: 0,

        '& .MuiCardHeader-avatar': {
            marginRight: theme.spacing(1)
        },
        
        '& .MuiCardHeader-content': {
            padding: '9px 15px',
            wordBreak: 'break-word',
            overflowX: 'hidden',
            overflowY: 'hidden',
            borderRadius: '20px',
            backgroundColor: '#e4e6eb',
            fontSize: '.9375rem',
            lineHeight: 1.3333,
            [theme.breakpoints.down('xs')]: {
                maxWidth: theme.spacing(27)
            },
            [theme.breakpoints.up('sm')]: {
                maxWidth: theme.spacing(37)
            },
            [theme.breakpoints.up('md')]: {
                maxWidth: theme.spacing(53)
            },
            [theme.breakpoints.up('lg')]: {
                maxWidth: theme.spacing(63)
            },
        },
    },
    iSay: {
        float: 'right',
        '& .MuiCardHeader-content': {
            backgroundColor: '#0084ff',
            '& .MuiCardHeader-title': {
                color: '#f5f5f5'
            }
        }
    },
    subContentISay: {
        right: 9
    },
    subContent: {
        bottom: -2,
        position: 'absolute',
        alignItems: 'center',
        display: 'flex',
        '& .MuiSvgIcon-root': {
            width: theme.spacing(2.3),
            height: theme.spacing(2.3),
        }
    }
    }));

const ConversationsChat = props => {

    const [ messange, setMessange ] = useState('');

    const [ enableSend, setEnableSend ] = useState(false);

    const [ openUploadImg, setOpenUploadImg ] = useState(false);

    const classes = useStyles();

    const handleChange = val => {
        val.target.value ? setEnableSend(true) : setEnableSend(false);
        setMessange(val.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        document.getElementById('form-send').reset();
        setMessange('');
    }

    const handleGetImgCroped = base64 => {
        console.log(base64);
    }

    return (
        <Box>
            <Paper variant="outlined" square={true}>
                <Card>
                    <CardHeader
                        avatar={
                            // dataItem.avatar
                            false
                            ?
                            <Avatar
                                src={ dataItem.avatar }
                            />
                            :
                            <Avatar
                                className={classes.avatar}
                                aria-label="recipe"
                            >
                                {/* { dataItem.name.substring(0, 1) } */}
                                M
                            </Avatar>
                        }
                        action={
                            <Tooltip title="Hành động">
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        title={ <Typography variant="h5">Nguyễn Đăng Dung</Typography>}
                        subheader={ <Typography variant="caption">Vừa mới truy cập</Typography>}
                    />
                    <Divider/>
                    <CardContent className={ classes.contentCard }>
                        <Box>
                            <PerfectScrollbar>
                                <CardHeader
                                    className={ classes.itemSay }
                                    avatar={
                                        // dataItem.avatar
                                        false
                                        ?
                                        <Avatar
                                            src={ dataItem.avatar }
                                            className={ classes.avatarSmall }
                                        />
                                        :
                                        <Avatar
                                            className={ clsx(classes.avatar, classes.avatarSmall)}
                                            aria-label="recipe"
                                        >
                                            {/* { dataItem.name.substring(0, 1) } */}
                                            M
                                        </Avatar>
                                    }
                                    title={ 
                                        <Tooltip placement="right-end" title="Just now">
                                            <Typography 
                                                variant="body1"
                                            >
                                                Hey, nice projects! I really liked the one in react. What's your quote on kinda similar project?
                                            </Typography>
                                        </Tooltip>
                                    }
                                    subheader={ 
                                        <Box className={ classes.subContent }>
                                            <Typography variant="caption">Vừa mới truy cập</Typography>
                                        </Box>
                                    }                                    
                                />
                                <CardHeader
                                    className={ clsx(classes.itemSay, classes.iSay) }
                                    title={ 
                                        <Tooltip placement="left-end" title="Last 3 minutes ago">
                                            <Typography 
                                                variant="body1"
                                                color="inherit"
                                            >
                                                Hey, nice projects!
                                            </Typography>
                                        </Tooltip>
                                    }
                                    subheader={ 
                                        <Box className={ clsx(classes.subContent, classes.subContentISay) }>
                                            <DoneAllOutlinedIcon color="default"/>
                                            &nbsp;
                                            <Typography variant="caption">Đã nhận</Typography>
                                        </Box>
                                    }                                    
                                />
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <CardHeader
                                    className={ classes.itemSay }
                                    avatar={
                                        // dataItem.avatar
                                        false
                                        ?
                                        <Avatar
                                            src={ dataItem.avatar }
                                            className={ classes.avatarSmall }
                                        />
                                        :
                                        <Avatar
                                            className={ clsx(classes.avatar, classes.avatarSmall)}
                                            aria-label="recipe"
                                        >
                                            {/* { dataItem.name.substring(0, 1) } */}
                                            M
                                        </Avatar>
                                    }
                                    title={ 
                                        <Tooltip placement="right-end" title="Just now">
                                            <Typography 
                                                variant="body1"
                                            >
                                                Hey, nice projects! I really liked the one in react. What's your quote on kinda similar project?
                                            </Typography>
                                        </Tooltip>
                                    }
                                    subheader={ 
                                        <Box className={ classes.subContent }>
                                            <Typography variant="caption">Vừa mới truy cập</Typography>
                                        </Box>
                                    }                                    
                                />
                                <CardHeader
                                    className={ clsx(classes.itemSay, classes.iSay) }
                                    title={ 
                                        <Tooltip placement="left-end" title="Last 3 minutes ago">
                                            <Typography 
                                                variant="body1"
                                                color="inherit"
                                            >
                                                Hey, nice projects!
                                            </Typography>
                                        </Tooltip>
                                    }
                                    subheader={ 
                                        <Box className={ clsx(classes.subContent, classes.subContentISay) }>
                                            <DoneAllOutlinedIcon color="default"/>
                                            &nbsp;
                                            <Typography variant="caption">Đã nhận</Typography>
                                        </Box>
                                    }                                    
                                />
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                
                            </PerfectScrollbar>
                        </Box>
                    </CardContent>
                    <Divider/>
                    <CardActions>
                        <CardHeader
                            className={ classes.actions }
                            avatar={
                                // dataItem.avatar
                                false
                                ?
                                <Avatar
                                    src={ dataItem.avatar }
                                />
                                :
                                <Avatar
                                    className={classes.avatar}
                                    aria-label="recipe"
                                >
                                    {/* { dataItem.name.substring(0, 1) } */}
                                    T
                                </Avatar>
                            }
                            action={
                                <form
                                    onSubmit={ handleSubmit }
                                    className={ classes.formMessange }
                                    id="form-send"
                                >
                                    <TextField
                                        id="leave-messange"
                                        placeholder="Aa"
                                        multiline
                                        rows={1}
                                        variant="outlined"
                                        className={ classes.areaContent }
                                        type="text"
                                        autoFocus
                                        onChange={ handleChange }
                                    />
                                    <Tooltip title="Gửi">
                                        <IconButton 
                                            aria-label="send"
                                            type="submit"
                                            disabled={!enableSend}
                                        >
                                            <SendOutlinedIcon className={ classes.rotate45deg } color={enableSend?"secondary":"default"} />
                                        </IconButton>
                                    </Tooltip>
                                    <Divider orientation="vertical" flexItem className={ classes.divider } />
                                    <Tooltip title="Đính kèm ảnh">
                                        <IconButton 
                                            aria-label="attack image"
                                            onClick={ () => setOpenUploadImg(!openUploadImg) }
                                        >
                                            <AddPhotoAlternateOutlinedIcon color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                </form>
                            }
                        />
                    </CardActions>
                </Card>
            </Paper>
            <UploadCropSingleImage openDialog={openUploadImg} imageInit="" dataNewImg={ handleGetImgCroped } titleName="Upload ảnh đính kèm" />
        </Box>
    );
};

ConversationsChat.propTypes = {
    
};

export default ConversationsChat;