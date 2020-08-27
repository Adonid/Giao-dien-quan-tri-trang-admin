import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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

    const { handleRecent, handleSingleChat, handleGroupChat, status, ...rest } = props;

    const [ stateClick, setStateClick ] = useState({
        recentChat: true,
        singleChat: false,
        groupChat: false,
    });

    const clickRecent = () => {
        setStateClick({...stateClick, recentChat: true, singleChat: false, groupChat: false});
    }
    const clickSingle = () => {
        setStateClick({...stateClick, recentChat: false, singleChat: true, groupChat: false});
    }
    const clickGroup = () => {
        setStateClick({...stateClick, recentChat: false, singleChat: false, groupChat: true});
    }

    return (
        <CardHeader
            action={
                <React.Fragment>
                    <IconButton aria-label="recent" color={ stateClick.recentChat ? "secondary" : "default" } onClick={ clickRecent }>
                        <Badge
                            variant="dot"
                            invisible={!status.recent}
                            color="secondary"
                        >
                            <AccessTimeOutlinedIcon />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="chat" color={ stateClick.singleChat ? "secondary" : "default" } onClick={ clickSingle }>
                        <ThemeProvider theme={themeBadgeMessage}>
                            <Badge
                                badgeContent={status.single}
                                color="error"
                                max={99}
                            >
                                <ChatBubbleOutlineOutlinedIcon />
                            </Badge>
                        </ThemeProvider>
                    </IconButton>
                    <IconButton aria-label="group" color={ stateClick.groupChat ? "secondary" : "default" } onClick={ clickGroup }>
                        <Badge
                            variant="dot"
                            invisible={!status.group}
                            color="secondary"
                        >
                            <PeopleAltOutlinedIcon />
                        </Badge>
                    </IconButton>
                </React.Fragment>
            }
            title={<Typography gutterBottom variant="h3" component="h2">Chats</Typography>}
        />
    );
};

TopHeaderChat.propTypes = {
    handleRecent : PropTypes.func.isRequired,
    handleSingleChat : PropTypes.func.isRequired,
    handleGroupChat : PropTypes.func.isRequired,
    status : PropTypes.object.isRequired,
};

export default TopHeaderChat;