import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid,
  Card,
  CardContent,
  Divider,
  CardActions,
  CardHeader
 } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { AccountProfile, AccountDetails } from './components';
import { connect } from 'react-redux';
import { GetMyProfile } from 'redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  padding: {
    padding: '0 15px 15px 15px'
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
  const { className, loading, profile, profileExtend, getMyProfile, rest } = props;
  const classes = useStyles();

  useEffect( () => {
    getMyProfile();
  },[]);

  if(loading){
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            md={5}
            xs={12}
          >
            <Card
              {...rest}
              className={clsx(classes.padding, className)}
            >
              <CardContent>
                <div className={classes.skeletonDetail}>
                  <div className={ classes.skeletonText}>
                    <Skeleton animation="wave" style={{ marginBottom: 10 }} width="60%" />
                    <Skeleton animation="wave" style={{ marginBottom: 5 }} height={10} width="60%" />
                    <Skeleton animation="wave" height={10} width="60%" />
                  </div>
                  <div>
                    <Skeleton animation="wave" variant="circle" width={80} height={80} />
                  </div>
                </div>
              </CardContent>
              <Divider />
              <CardActions>
                  <Skeleton animation="wave" style={{ marginBottom: 10 }} width="20%" />
              </CardActions>
            </Card>
          </Grid>

          <Grid
            item
            md={7}
            xs={12}
          >
              <Card
                {...rest}
                className={clsx(classes.padding, className)}
              >
                <CardHeader
                  title={<Skeleton animation="wave" style={{ marginBottom: 5 }} width="20%" />}
                  subheader={<Skeleton animation="wave" height={10} width="40%" />}
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={5} >
                    <Grid item xs={12} sm={6}>
                      <Skeleton animation="wave" style={{ marginBottom: 15 }} width="100%" />
                      <Skeleton animation="wave" width="100%" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Skeleton animation="wave" style={{ marginBottom: 15 }} width="100%" />
                      <Skeleton animation="wave" width="100%" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile profile={{ displayName: profile.displayName, photoURL: profile.photoURL, avatarDraft: profileExtend.avatarDraft, emailVerified: profile.emailVerified}} />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails profileExtend={{ displayName: profile.displayName, phoneNumber: profile.phoneNumber, email: profile.email, address: profileExtend.address, avatarDraft: profileExtend.avatarDraft}} />
        </Grid>
      </Grid>
    </div>
  );
};

Account.propTypes = {
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  profileExtend: PropTypes.object.isRequired,

  getMyProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.dataMyProfile.profile,
  profileExtend: state.dataMyProfile.profileExtend,
  loading: state.dataMyProfile.loading,
});

const mapDispatchToProps = dispatch => ({
  getMyProfile: () => dispatch( GetMyProfile() ),
});


export default connect(mapStateToProps, mapDispatchToProps)(Account);
