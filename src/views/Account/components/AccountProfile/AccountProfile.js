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
  LinearProgress
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { UploadCropSingleImage } from 'components';
import { deepOrange } from '@material-ui/core/colors';
import {AdminProfile} from 'redux/actions';


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
  const { className, uploadAvatar, mockData, ...rest } = props;

  const classes = useStyles();

  const [ openUploader, setOpenUploader ] = useState(false);

  const [ dataImage, setDataImage ] = useState(mockData.avatar);

  useEffect( () => {
    // Goi api de cap nhat du lieu - chi goi duy nhat 1 lan dau tien khi mounting xong lan dau
    // Muc dich la de hien thi loading... trong lan dau tien vao component nay
    // cac lan sau khi vao component nay thi co du lieu tren store roi se tu dong khong thay trang thai loading... nua ma co du lieu ngay
  },[]);

  const getDataImage = imgBase64 => {
    setDataImage(imgBase64);
    const img = imgBase64.replace(/^data:image\/jpeg;base64,/, "");
    // api de thay doi avatar
    uploadAvatar(img);
  };

  const handleRemoveAvatar = () => {
    setDataImage(null);
    // api de xoa anh avatar
    uploadAvatar(null);
  }

  if(!Object.keys(mockData).length){
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
              { mockData.require.userName }
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
            {
              dataImage
              ?
              <Avatar
                className={classes.avatar}
                src={dataImage}
              />
              :
              <Avatar alt={ mockData.require.userName } src={dataImage} className={classes.orange}/>
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
  uploadAvatar: PropTypes.func.isRequired,
  mockData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  mockData: state.dataUserEditor.dataUser
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => { dispatch( AdminProfile() ) },
  uploadAvatar: img => { dispatch({ type: 'UPLOAD_AVATAR',img: img }) },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
