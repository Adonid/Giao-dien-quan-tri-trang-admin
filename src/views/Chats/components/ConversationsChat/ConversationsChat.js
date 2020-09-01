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
        maxHeight: 490-147,
        backgroundColor: '#f4f6f8'
    },
    itemSay: {
        '& .MuiCardHeader-avatar': {
            marginRight: theme.spacing(1)
        },
        
        '& .MuiCardHeader-content': {
            padding: '7px 12px 8px 12px',
            wordBreak: 'break-word',
            overflowX: 'hidden',
            overflowY: 'hidden',
            borderRadius: '18px',
            backgroundColor: '#e4e6eb',
            fontSize: '.9375rem',
            lineHeight: 1.3333,
            [theme.breakpoints.down('xs')]: {
                maxWidth: theme.spacing(30)
            },
            [theme.breakpoints.up('sm')]: {
                maxWidth: theme.spacing(40)
            },
            [theme.breakpoints.up('md')]: {
                maxWidth: theme.spacing(55)
            },
            [theme.breakpoints.up('lg')]: {
                maxWidth: theme.spacing(63)
            },
        },
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

    const classes = useStyles();

    const handleChange = val => setMessange(val.target.value);

    const handleSubmit = event => {
        event.preventDefault();
        document.getElementById('form-send').reset();
        setMessange('');
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
                                        <Typography 
                                            variant="body1"
                                        >
                                            Hey, nice projects! I really liked the one in react. What's your quote on kinda similar project?
                                        </Typography>
                                    }
                                    subheader={ 
                                        <Box className={ classes.subContent }>
                                            <Typography variant="caption">Vừa mới truy cập</Typography>
                                            &nbsp;
                                            &nbsp;
                                            •
                                            &nbsp;
                                            &nbsp;
                                            <DoneAllOutlinedIcon color="secondary"/>
                                            &nbsp;
                                            <Typography variant="caption">Đã xem</Typography>
                                        </Box>
                                     }
                                    className={ classes.itemSay }
                                    
                                />
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
                                        onChange={ handleChange }
                                    />
                                    <Tooltip title="Gửi">
                                        <IconButton 
                                            aria-label="send"
                                            type="submit"
                                            
                                        >
                                            <SendOutlinedIcon className={ classes.rotate45deg } color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                    <Divider orientation="vertical" flexItem className={ classes.divider } />
                                    <Tooltip title="Đính kèm ảnh">
                                        <IconButton aria-label="attack image">
                                            <AddPhotoAlternateOutlinedIcon color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                </form>
                            }
                        />
                    </CardActions>
                </Card>
            </Paper>
        </Box>
    );
};

ConversationsChat.propTypes = {
    
};

export default ConversationsChat;