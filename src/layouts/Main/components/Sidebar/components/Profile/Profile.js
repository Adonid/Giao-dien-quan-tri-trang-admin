import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={ "https://firebasestorage.googleapis.com/v0/b/blogger-firebase.appspot.com/o/avatar%2Fa2587759-cdfb-46cd-8215-96c2a44da9ae.jpg?alt=media&token=a2587759-cdfb-46cd-8215-96c2a44da9ae" }
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        { "Phan Trọng Hoàng" }
      </Typography>
      <Typography variant="body2">Quản trị website</Typography>
    </div>
  );
};

Profile.propTypes = {
  
};

export default Profile