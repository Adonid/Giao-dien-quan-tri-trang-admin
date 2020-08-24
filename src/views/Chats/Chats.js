import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { ChatsList } from './components';


const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 35,
        height: '100%',
        [theme.breakpoints.up('md')]: {
          paddingTop: 45
        }
    },
    shiftContent: {
        paddingLeft: 256
      },
    content: {
        height: '100%'
      }
  }));

const Chats = props => {
    const { children } = props;

    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
      defaultMatches: true
    });
  
    const [openSidebar, setOpenSidebar] = useState(false);
  
    const [openAddUser, setOpenAddUser] = useState(false);
  
    const handleSidebarOpen = () => {
      setOpenSidebar(true);
    };
  
    const handleChatsListClose = () => {
      setOpenSidebar(false);
    };
  
    const shouldOpenChatsList = isDesktop ? true : openSidebar;

    return (
        <div 
        className={clsx({
            [classes.root]: true,
            [classes.shiftContent]: isDesktop
          })}
        >
            <ChatsList
                onClose={handleChatsListClose}
                open={shouldOpenChatsList}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
};

Chats.propTypes = {
    children: PropTypes.node
};

export default Chats;