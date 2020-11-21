import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = props => {
  const { profile, } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

Account.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.dataUserProfile
});




export default connect(mapStateToProps, mapDispatchToProps)(Account);
