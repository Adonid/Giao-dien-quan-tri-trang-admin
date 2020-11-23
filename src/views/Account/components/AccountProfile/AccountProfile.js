import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
  CircularProgress
} from '@material-ui/core';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { orange } from '@material-ui/core/colors';
import { deepOrange } from '@material-ui/core/colors';
import { getAvatarUrl, getInitials } from 'helpers';
import { OPEN_DIALOG_UPLOAD_IMG } from 'redux/constans';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    backgroundColor: orange[500],
    textTransform: 'uppercase'
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  hozirator: {
    justifyContent: 'space-evenly'
  },
  textInfo: {
    padding: '6px',
    fontSize: '10px',
  },
  textWarning: {
    backgroundColor: '#ffefc2',
    color: '#ffab40!important',
  },
  textSuccess: {
    backgroundColor: '#4caf5014',
    color: '#4caf50!important',
  },
}));

const AccountProfile = props => {
  const { 
    className,
    loading,
    tokenAvatar,
    profile,
    openUploadImg,
    ...rest
   } = props;

  const classes = useStyles();

  const openUploadAvatar = () => {
    const contentUpload = {
      type: 'upload-avatar-directly',
      imageInit: profile.photoURL || getAvatarUrl(profile.avatarDraft.newToken),
      titleName: 'Cập nhật ảnh đại diện',
      options:{}
    };
    openUploadImg(contentUpload);
}

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              { profile.displayName }
            </Typography>
            <Typography
              className={classes.locationText}
              variant="h5"
            >
              Quản trị website
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {dayjs().format('dddd, DD, MMMM, YYYY hh:mm A')}
            </Typography>
          </div>
          <Avatar
              className={classes.avatar}
              src={ tokenAvatar ? getAvatarUrl(tokenAvatar) : profile.photoURL }
              >
              {getInitials( profile.displayName )}
          </Avatar>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Hồ sơ hoàn thành: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.hozirator}>
        <Button
          className={classes.uploadButton}
          variant="text"
          startIcon={ !loading ? <PublishOutlinedIcon /> : <CircularProgress size={15} />}
          onClick={ openUploadAvatar }
          disabled={loading}
        >
          Ảnh avatar
        </Button>
        <Button size="small" disabled className={clsx(classes.textInfo, profile.emailVerified ? classes.textSuccess : classes.textWarning)}>
          Email {profile.emailVerified ? "đã" : "chưa"} xác nhận
        </Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  tokenAvatar: PropTypes.string.isRequired,
  openUploadImg: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.dataUploadAvatar.loading,
  tokenAvatar: state.dataUploadAvatar.tokenAvatar,
});

const mapDispatchToProps = dispatch => ({
  openUploadImg: content => dispatch({
    type: OPEN_DIALOG_UPLOAD_IMG,
    content: content
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
