import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { 
  Grid, 
  Box,
  Hidden,
  Paper

} from '@material-ui/core';
import { ChatsList, ConversationsChat } from './components';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    heightChatList: {
      height: "100%"
    }
  }));

const Chats = props => {
    const { children } = props;

    const classes = useStyles();

    return (
        <Box >
          <Grid container>
              <Hidden xsDown>
                <ChatsList classes={ classes.heightChatList }/>
              </Hidden>
              <Hidden smUp>
                <Paper className={classes.paper}>NOI DUNG DANH CHO MAN HINH IPAD MINI TRO XUONG </Paper>
              </Hidden>
            <Grid item xs={8}>
              <main>
                <ConversationsChat/>
              </main>
            </Grid>
          </Grid>
        </Box>
    );
};

Chats.propTypes = {
    children: PropTypes.node
};

export default Chats;