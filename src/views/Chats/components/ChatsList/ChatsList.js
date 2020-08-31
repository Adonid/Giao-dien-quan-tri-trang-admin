import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { className, chatsList, viewItemChat, ...rest } = props;
    
    const classes = useStyles();

    const handleViewConversation = id => viewItemChat(id);

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
                  {
                    chatsList.map( itemChat => 
                        <ItemChats key={itemChat.key} dataItem={ itemChat } viewConversation={ handleViewConversation } />
                    )
                  }
                    
                  
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
    chatsList: PropTypes.array.isRequired,
    viewItemChat: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    chatsList: state.ChatsData.chatsList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    viewItemChat: id => {
      dispatch({
        type: "VIEW_ITEM_CHAT",
        id: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsList)