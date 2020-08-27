import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, fade } from '@material-ui/core/styles';
import {  
    CardHeader,
    Typography,
    IconButton,
    Badge,

 } from '@material-ui/core';
 import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
 import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
 import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

 const themeBadgeMessage = createMuiTheme({
    palette: {
      error : {
        main: '#8bc34a',
        contrastText: '#fff',
      },
    },
  });

const TopHeaderChat = props => {

    return (
        <CardHeader
            action={
                <React.Fragment>
                    <IconButton aria-label="settings" >
                        <Badge
                        variant="dot"
                        color="secondary"
                        >
                        <AccessTimeOutlinedIcon />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="chat" color="secondary">
                        <ThemeProvider theme={themeBadgeMessage}>
                        <Badge
                            badgeContent={10}
                            color="error"
                            max={9}
                        >
                            <ChatBubbleOutlineOutlinedIcon />
                        </Badge>
                        </ThemeProvider>
                    </IconButton>
                    <IconButton aria-label="group">
                        <ThemeProvider theme={themeBadgeMessage}>
                        <Badge
                            variant="dot"
                            color="error"
                        >
                            <PeopleAltOutlinedIcon />
                        </Badge>
                        </ThemeProvider>
                    </IconButton>
                </React.Fragment>
            }
            title={<Typography gutterBottom variant="h3" component="h2">Chats</Typography>}
        />
    );
};

TopHeaderChat.propTypes = {
    
};

export default TopHeaderChat;