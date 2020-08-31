import React from 'react';
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
    TextField
 } from '@material-ui/core';
 import IconButton from '@material-ui/core/IconButton';
 import MoreVertIcon from '@material-ui/icons/MoreVert';

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

    },
    }));

const ConversationsChat = props => {

    const classes = useStyles();
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
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={ <Typography variant="h5">Nguyễn Đăng Dung</Typography>}
                        subheader={ <Typography variant="caption">Vừa mới truy cập</Typography>}
                    />
                    <Divider/>
                    <CardContent>

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
                                    className={ classes.formMessange }
                                >
                                    <TextField
                                        id="leave-messange"
                                        label="Messange"
                                        multiline
                                        rows={1}
                                        variant="outlined"
                                        className={ classes.areaContent }
                                    />
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
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