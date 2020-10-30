import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Topbar } from './components';
import { connect } from 'react-redux';
import { Snackbars } from 'alerts';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Minimal = props => {
  const { 
    children,
    alertMini,
   } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
      <Snackbars data={ alertMini } />
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  alertMini: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  alertMini: state.dataMessage.miniMessage,
});

export default connect(mapStateToProps, null)(Minimal)
