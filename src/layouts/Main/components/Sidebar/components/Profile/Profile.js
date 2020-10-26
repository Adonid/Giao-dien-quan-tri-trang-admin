import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

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
  const { className, avatarUrl, userName, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={ avatarUrl }
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        { userName }
      </Typography>
      <Typography variant="body2">Quản trị website</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  avatarUrl: state.dataAdminProfile.avatarUrl,
  userName: state.dataAdminProfile.userName,
});

export default connect(mapStateToProps, null)(Profile)