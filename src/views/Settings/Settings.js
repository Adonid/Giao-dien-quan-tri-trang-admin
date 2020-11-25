import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { 
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider
 } from '@material-ui/core';
 import Skeleton from '@material-ui/lab/Skeleton';
import { Notifications, Password } from './components';
import { connect } from 'react-redux';
import { GetNotifyRules } from 'redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  padding: {
    padding: '0 15px 15px 15px'
  },
  horizator: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px!important'
  }
}));

const Settings = props => {
  const { loading, notifyRules, getNotifyRules } = props;
  const classes = useStyles();

  useEffect( () => {
    getNotifyRules();
    document.title="Nhận thông báo";
  }, []);

  if(loading){
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={7}
            xs={12}
          >
            <Card
              className={clsx(classes.padding)}
            >
              <CardHeader
                title={<Skeleton animation="wave" style={{ marginBottom: 5 }} width="20%" />}
                subheader={<Skeleton animation="wave" height={10} width="35%" />}
              />
              <Divider />
              <CardContent>
                <Grid container spacing={5} >
                    <Grid item xs={12} sm={6} className={classes.horizator}>
                      <Skeleton animation="wave" style={{ marginRight: 15 }} width="27px" height="36px" />
                      <Skeleton animation="wave" width="50%" height={10} />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.horizator}>
                      <Skeleton animation="wave" style={{ marginRight: 15 }} width="27px" height="36px" />
                      <Skeleton animation="wave" width="50%" height={10} />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.horizator}>
                      <Skeleton animation="wave" style={{ marginRight: 15 }} width="27px" height="36px" />
                      <Skeleton animation="wave" width="50%" height={10} />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.horizator}>
                      <Skeleton animation="wave" style={{ marginRight: 15 }} width="27px" height="36px" />
                      <Skeleton animation="wave" width="50%" height={10} />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.horizator}>
                      <Skeleton animation="wave" style={{ marginRight: 15 }} width="27px" height="36px" />
                      <Skeleton animation="wave" width="50%" height={10} />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.horizator}>
                      <Skeleton animation="wave" style={{ marginRight: 15 }} width="27px" height="36px" />
                      <Skeleton animation="wave" width="50%" height={10} />
                    </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                  <Skeleton animation="wave" width="15%" />
              </CardActions>
            </Card>
          </Grid>

          <Grid
            item
            md={5}
            xs={12}
          >
              <Card

                className={clsx(classes.padding)}
              >
                <CardHeader
                  title={<Skeleton animation="wave" style={{ marginBottom: 5 }} width="20%" />}
                  subheader={<Skeleton animation="wave" height={10} width="35%" />}
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={5} >
                    <Grid item xs={12} >
                      <Skeleton animation="wave" style={{ marginBottom: 15 }} width="100%" />
                      <Skeleton animation="wave" width="100%" />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Skeleton animation="wave" width="15%" />
                </CardActions>
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
        spacing={4}
      >
        <Grid
          item
          md={7}
          xs={12}
        >
          <Notifications notifyRules={notifyRules} />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
        >
          <Password />
        </Grid>
      </Grid>
    </div>
  );
};

Settings.PropTypes = {
    loading: PropTypes.bool.isRequired,
    notifyRules: PropTypes.object.isRequired,

    getNotifyRules: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    loading: state.dataNotifyRules.loading,
    notifyRules: state.dataNotifyRules.notifyRules
});

const mapDispatchToProps = dispatch => ({
  getNotifyRules: () => dispatch( GetNotifyRules() ),
});

export default connect(mapStateToProps, mapDispatchToProps )(Settings)
