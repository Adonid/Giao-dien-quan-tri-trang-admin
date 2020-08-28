import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createMuiTheme, ThemeProvider, fade } from '@material-ui/core/styles';
import {  
    Divider,
    Grid,
    Paper,
    Card,
    CardContent,
    List,

 } from '@material-ui/core';
 import PerfectScrollbar from 'react-perfect-scrollbar';
 import {TopHeaderChat, SearchChats, ItemChats} from './components';

 const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  },
  scrollList: {
    height: "333px",
    display: "flex",
    flexDirection: "column",
  }
  }));


const ChatsList = props => {
    const { open, variant, onClose, className, ...rest } = props;
    
    const classes = useStyles();

    const handleViewConversation = () => {
      console.log('event');
    }

    return (
      <Grid item sm={3}>
        <Paper elevation={0}>
          <Card>

            <TopHeaderChat status={{recent: true, single: 12, group: true}}/>

            <SearchChats/>
            
            <Divider/>
            <CardContent className={ classes.root }>
              <PerfectScrollbar className={ classes.scrollList }>
                <List>
                  
                  <ItemChats viewConversation={ handleViewConversation } />
                  <ItemChats viewConversation={ handleViewConversation } />
                  
                </List>
              </PerfectScrollbar>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    );
};

ChatsList.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
};

export default ChatsList;