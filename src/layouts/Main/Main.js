import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';
import { Snackbars } from 'alerts';
import { FormAddUser } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { 
    children, 
    dataAlertNotify, 
    dataAlertUserDetail, 
    dataAlertAddUser, 
    dataAlertUserEditor, 
    dataAlertCreateNewPost, 
    dataAlertDetailNewPost, 
    dataAlertUpdateTerm, 
    openAddNewUser, 
    ...rest  
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>

      <Snackbars data={ dataAlertNotify } />
      <Snackbars data={ dataAlertAddUser } />
      <Snackbars data={ dataAlertUserDetail } />
      <Snackbars data={ dataAlertUserEditor } />
      <Snackbars data={ dataAlertCreateNewPost } />
      <Snackbars data={ dataAlertDetailNewPost } />
      <Snackbars data={ dataAlertUpdateTerm } />
      <FormAddUser openCall={openAddNewUser} />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

  const mapStateToProps = (state, ownProps) => {
    return {
      dataAlertNotify: state.dataNotifys.alert,
      dataAlertAddUser: state.dataNewUser.alert,
      dataAlertUserDetail: state.dataUserDetail.alert,
      dataAlertUserEditor: state.dataUserEditor.alert,
      dataAlertCreateNewPost: state.dataManipulationPost.createPost.alert,
      dataAlertDetailNewPost: state.dataPostDetail.limitInfo.alert,
      dataAlertUpdateTerm: state.dataTerm.alert,
      openAddNewUser: state.dataNewUser.show,
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      dispatch1: () => {
        dispatch(actionCreator)
      }
    }
  }

  Main.propTypes = {
    dataAlertNotify: PropTypes.object.isRequired,
    dataAlertAddUser: PropTypes.object.isRequired,
    dataAlertUserDetail: PropTypes.object.isRequired,
    dataAlertUserEditor: PropTypes.object.isRequired,
    dataAlertCreateNewPost: PropTypes.object.isRequired,
    dataAlertDetailNewPost: PropTypes.object.isRequired,
    dataAlertUpdateTerm: PropTypes.object.isRequired,
    openAddUser: PropTypes.bool,
  }

export default connect(mapStateToProps, mapDispatchToProps)(Main);
