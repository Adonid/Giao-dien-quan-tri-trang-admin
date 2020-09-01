import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
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

 const useStyles = makeStyles(theme => ({
    root: {
      
    },
    avatar: {
        backgroundColor: red[500],
        textTransform: 'uppercase'
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
            width: theme.spacing(73)
        },
        [theme.breakpoints.up('lg')]: {
            width: theme.spacing(83)
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
        maxHeight: 490-147
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
                                        label="Messange"
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
                                            <SendOutlinedIcon className={ classes.rotate45deg } color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                    <Divider orientation="vertical" flexItem className={ classes.divider } />
                                    <Tooltip title="Đính kèm ảnh">
                                        <IconButton aria-label="attack image">
                                            <AddPhotoAlternateOutlinedIcon color="primary" />
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