import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid,
  Card,
  CardContent
 } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { AccountProfile, AccountDetails } from './components';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  skeletonDetail: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  skeletonText: {
    position: 'relative',
    width: '100%',
  }
}));

const Account = props => {
  const { profile, loading } = props;
  const classes = useStyles();

  if(loading){
    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent>
          <div className={classes.skeletonDetail}>
            <div className={ classes.skeletonText}>
              <Skeleton animation="wave" style={{ marginBottom: 10 }} width="60%" />
              <Skeleton animation="wave" style={{ marginBottom: 5 }} height={10} width="80%" />
              <Skeleton animation="wave" height={10} width="60%" />
            </div>
            <div>
              <Skeleton animation="wave" variant="circle" width={80} height={80} />
            </div>
          </div>
        </CardContent>
        <Divider />
        <CardActions>
            <Skeleton animation="wave" height={10} width="60%"/>
        </CardActions>
      </Card>
    );
  }

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
  profile: state.dataUserProfile.profile,
  loading: state.dataUserProfile.loading,
});




export default connect(mapStateToProps, null)(Account);
