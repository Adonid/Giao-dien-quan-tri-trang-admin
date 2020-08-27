import React from 'react';
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


  const handleMessage = event => {
    console.log(event);
  }

const ChatsList = props => {
    const { open, variant, onClose, className, ...rest } = props;

    const classes = useStyles();
    return (
      <Grid item sm={3}>
        <Paper elevation={0}>
          <Card>

            <TopHeaderChat/>

            <SearchChats/>
            
            <Divider/>
            <CardContent className={ classes.root }>
              <PerfectScrollbar className={ classes.scrollList }>
                <List>
                  
                  <ItemChats/>
                  
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