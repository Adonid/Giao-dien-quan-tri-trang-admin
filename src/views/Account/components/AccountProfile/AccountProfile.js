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
import { orange } from '@material-ui/core/colors';
import { UploadCropSingleImage } from 'components';
import { deepOrange } from '@material-ui/core/colors';
import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
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
}));

const AccountProfile = props => {
  const { 
    className, uploadAvatar, avatarUrl, tokenAvatar, userName, getProfile, loadingAvatar,
    user,
    ...rest
   } = props;

  const classes = useStyles();

  const [ openUploader, setOpenUploader ] = useState(false);

  useEffect( () => {
    getProfile();
  },[]);

  const getDataImage = base64 => uploadAvatar(base64, tokenAvatar);

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
              { user.profile.displayName }
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
              src={ user.profile.photoURL }
              >
              {getInitials( user.profile.displayName )}
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
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={ () => setOpenUploader(!openUploader) }
          disabled={false}
        >
          {false && <CircularProgress size={15} />} Upload avatar
        </Button>
      </CardActions>
      <UploadCropSingleImage openDialog={openUploader} imageInit={ avatarUrl } dataNewImg={ getDataImage} />
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  
});

export default connect(null, mapDispatchToProps)(AccountProfile);
