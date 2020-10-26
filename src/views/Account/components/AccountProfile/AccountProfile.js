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
import Skeleton from '@material-ui/lab/Skeleton';
import { UploadCropSingleImage } from 'components';
import { deepOrange } from '@material-ui/core/colors';
import { getInitials } from 'helpers';
import {AdminProfile, UploadAvatar} from 'redux/actions';


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
  skeletonDetail: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  skeletonText: {
    position: 'relative',
    width: '100%',
  }
}));

const AccountProfile = props => {
  const { className, uploadAvatar, avatarUrl, tokenAvatar, userName, getProfile, loading, loadingAvatar, ...rest } = props;

  const classes = useStyles();

  const [ openUploader, setOpenUploader ] = useState(false);

  useEffect( () => {
    getProfile();
  },[]);

  const getDataImage = base64 => uploadAvatar(base64, tokenAvatar);

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
              { userName }
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
              src={ avatarUrl }
              >
              {getInitials( userName )}
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
          disabled={loadingAvatar}
        >
          {loadingAvatar && <CircularProgress size={15} />} Upload avatar
        </Button>
      </CardActions>
      <UploadCropSingleImage openDialog={openUploader} imageInit={ avatarUrl } dataNewImg={ getDataImage} />
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  uploadAvatar: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingAvatar: PropTypes.bool.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  tokenAvatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.dataAdminProfile.loadingProfile,
  loadingAvatar: state.dataAdminProfile.loadingAvatar,
  avatarUrl: state.dataAdminProfile.avatarUrl,
  tokenAvatar: state.dataAdminProfile.tokenAvatar,
  userName: state.dataAdminProfile.userName,
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => { dispatch( AdminProfile() ) },
  uploadAvatar: (base64, token) => { dispatch(UploadAvatar(base64, token)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
