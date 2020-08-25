import React from 'react';
import PropTypes from 'prop-types';
import { 
    Paper, 
    Card, 
    CardHeader,
    Typography,
    Divider
 } from '@material-ui/core';

const ConversationsChat = props => {
    return (
        <Paper>
            <Card>
                <CardHeader>
                <Typography component="h3" variant="h2">
                    Live From Space
                </Typography>
                </CardHeader>
                <Divider/>
            </Card>
        </Paper>
    );
};

ConversationsChat.propTypes = {
    
};

export default ConversationsChat;