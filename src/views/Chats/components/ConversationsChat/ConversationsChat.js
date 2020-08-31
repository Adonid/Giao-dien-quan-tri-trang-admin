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
    Avatar
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
    }));

const ConversationsChat = props => {
    return (
        <Box>
            <Paper variant="outlined" square={true}>
                <Card>
                    <CardHeader
                        avatar={
                            dataItem.avatar
                            ?
                            <Avatar
                                src={ dataItem.avatar }
                            />
                            :
                            <Avatar
                                className={classes.avatar}
                                aria-label="recipe"
                            >
                                { dataItem.name.substring(0, 1) }
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
                </Card>
            </Paper>
        </Box>
    );
};

ConversationsChat.propTypes = {
    
};

export default ConversationsChat;