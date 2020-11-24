import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';
import { Snackbars } from 'alerts';
import { FormAddUser, DialogConfirm, UploadCropImg } from 'components';

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
    dataAlertCreateNewPost, 
    dataAlertDetailNewPost, 
    dataAlertUpdateTerm, 

    openForm,
    mainMessage
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
      <Snackbars data={ dataAlertUserDetail } />
      <Snackbars data={ dataAlertCreateNewPost } />
      <Snackbars data={ dataAlertDetailNewPost } />
      <Snackbars data={ dataAlertUpdateTerm } />

      <Snackbars data={ mainMessage } />
      
      <FormAddUser openForm={ openForm } />

      <DialogConfirm />

      <UploadCropImg />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,

  dataAlertNotify: PropTypes.object.isRequired,
  dataAlertUserDetail: PropTypes.object.isRequired,
  dataAlertCreateNewPost: PropTypes.object.isRequired,
  dataAlertDetailNewPost: PropTypes.object.isRequired,
  dataAlertUpdateTerm: PropTypes.object.isRequired,

  openForm: PropTypes.bool.isRequired,
  mainMessage: PropTypes.object.isRequired,
}

  const mapStateToProps = state => ({
      dataAlertNotify: state.dataNotifys.alert,
      dataAlertUserDetail: state.dataUserDetail.alert,
      dataAlertCreateNewPost: state.dataManipulationPost.createPost.alert,
      dataAlertDetailNewPost: state.dataPostDetail.limitInfo.alert,
      dataAlertUpdateTerm: state.dataTerm.alert,

      openForm: state.dataMannegerUser.openForm,

      mainMessage: state.dataMessage.mainMessage,
  });

export default connect(mapStateToProps, null)(Main);
