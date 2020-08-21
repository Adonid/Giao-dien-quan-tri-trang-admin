import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
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
  LinearProgress
} from '@material-ui/core';
import { UploadCropSingleImage } from 'components';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


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
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  orange: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [ openUploader, setOpenUploader ] = useState(false);

  const [ dataImage, setDataImage ] = useState(props.mockData.avatar);

  const getDataImage = imgBase64 => {
    setDataImage(imgBase64);
    const img = imgBase64.replace(/^data:image\/jpeg;base64,/, "");
    // api de thay doi avatar
    props.uploadAvatar(img);
  };

  const handleRemoveAvatar = () => {
    setDataImage(null);
    // api de xoa anh avatar
    props.uploadAvatar(null);
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
              { props.mockData.require.userName }
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              Quản trị website
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} (GMT +07)
            </Typography>
          </div>
            {
              dataImage
              ?
              <Avatar
                className={classes.avatar}
                src={dataImage}
              />
              :
              <Avatar alt={ props.mockData.require.userName } src={dataImage} className={classes.orange}/>
            }
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
        >
          Upload avatar
        </Button>
        <Button 
        variant="text"
        onClick={ handleRemoveAvatar }
        >
          Xóa avatar
        </Button>
      </CardActions>
      <UploadCropSingleImage openDialog={openUploader} imageInit={dataImage} dataNewImg={ getDataImage} />
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    mockData: state.dataUserEditor.dataUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    uploadAvatar: img => {
      dispatch({
        type: 'UPLOAD_AVATAR',
        img: img
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile)
