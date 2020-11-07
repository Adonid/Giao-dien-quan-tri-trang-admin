import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { connect } from 'react-redux';
import {
    Link as RouterLink, 
    useParams
  } from "react-router-dom";
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { 
    Breadcrumbs, 
    Link, 
    Typography, 
    Button,
    Grid,
    Card,
    Box,
    CardContent,
    createMuiTheme,
    TextField,
    Switch,
    Avatar,
    LinearProgress
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { UploadCropImg, SelectAddress } from 'components';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { CommunesBelongToDistrict, DistrictBelongToProvince, GetUserEdit } from 'redux/actions';
import { getInitials, toSlug } from 'helpers';
import { OPEN_DIALOG_UPLOAD_IMG } from 'redux/constans';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(5)
  },
  contentLoading: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    width: "50%",
    textAlign: "center",
    margin: "auto",
  },
  cardLoading: {
    backgroundColor: "#9e9e9e14"
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(0.5)
    },
  customspace: {
    '& .MuiGrid-root': {
        '& .MuiTextField-root, .MuiFormControl-root': {
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
            minWidth: '10%',
            width: '100%'
        }
    }
  },
  upload: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    justifyContent: 'space-between'
  },
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const schema = {
    displayName: {
        presence: { allowEmpty: false, message: '^Tên người dùng không được trống!' },
        length: {
            minimum: 3,
            message: "^Tối thiểu 3 ký tự!",
          }
    },
    email: {
      presence: { allowEmpty: false, message: 'không để trống!' },
      email: {
        is: true,
        message: "không đúng!",
      },
      length: {
        maximum: 64,
        message: "tối đa 64 ký tự!",
      }
    },
    phoneNumber: {
        presence: { allowEmpty: false, message: '^Số điện thoại không để trống' },
        length: {
          is: 10,
          message: "^Số điện thoại phải đúng 10 số!"
        },
        format: {
          pattern: "^(086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|078|077|076|094|091|088|085|084|083|082|081|092|058|056).[0-9]+",
          flags: "i",
          message: "^Số điện thoại không đúng!"
        }
    }
  };

const themeButtonUpdate = createMuiTheme({
    palette: {
        primary : {
        main: '#5850EC',
        contrastText: '#fff',
        },
    },
});

const UserEditor = props => {

  const { 
    loading,
    loadingButtonSave,
    account,
    address,
    getUserEdit,
    provinces, 
    districts,
    communes,
    enableProvince,
    enableDistrict,
    enableCommune,
    districtsBelongToProvince,
    communesBelongToDistrict,
    openUploadImg,
   } = props;

   const { uid } = useParams();

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: account?{phoneNumber: account.phoneNumber , displayName: account.displayName , email: account.email }:{},
    touched: {},
    errors: {}
  });
  const [formOptions, setFormOptions] = useState({
    province: address.province,
    district: address.district,
    commune: address.commune,
    street: address.street
  });

  const [ emailVerify, setEmailVerify ] = useState(false);

  const [ dataImage, setDataImage ] = useState('');

  useEffect( () => {
    // Load du lieu nguoi dung o day
    getUserEdit(uid);
  },[]);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]:
            event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true
        }
      }));
  }

  const handleChangeSwitch = event => setEmailVerify(event.target.checked);

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

  const getDataImage = imgBase64 => setDataImage(imgBase64);

  const [ enableStreet, setEnableStreet ] = useState(false);

  const getProvince = val => {
    setFormOptions( formOptions => ({...formOptions, province: val.name_with_type}));
    setEnableStreet(false);
    districtsBelongToProvince(val.code);
    setFormOptions( formOptions => ({...formOptions, district: ""}));
    setFormOptions( formOptions => ({...formOptions, commune: ""}));
  }
  
  const getDistrict = val => {
    setFormOptions( formOptions => ({...formOptions, district: val.name_with_type}));
    setEnableStreet(false);
    communesBelongToDistrict(val.code);
    setFormOptions( formOptions => ({...formOptions, commune: ""}));
  }
  
  const getCommune = val => {
    setFormOptions( formOptions => ({...formOptions, commune: val.name_with_type}));
    
    setEnableStreet(true);
  }

  const handleStreet = event => {
    event.persist();
    setFormOptions( formOptions => ({...formOptions, street: event.target.value}));
    };

  const openUploadAvatar = () => {
      const contentUpload = {
        imageInit: account.photoURL,
        titleName: "Tải lên ảnh avatar",
        uid,
        type: 'upload-avatar-user'
      };
      openUploadImg(contentUpload);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const newProfile = { uid, ...formState.values, ...formOptions, emailVerifed: emailVerify, photoURL: dataImage};
    console.log(newProfile);
    // update
  }

  if(loading){
    return (
      <React.Fragment>
        <Card className={classes.cardLoading}>
          <CardContent className={classes.contentLoading}>
            <LinearProgress />
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.row}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" gutterBottom>
                <Link color="inherit" component={RouterLink} to="/dashboard">
                    Dashboard
                </Link>
                <Link color="inherit" component={RouterLink} to="/users">
                  Quản lý người dùng
                </Link>
                <Typography color="textPrimary">{ toSlug(account.displayName).replace(/(\s+)/g, '-')}</Typography>
            </Breadcrumbs>
            <Link color="inherit" underline="none" component={RouterLink}  to={"/user-detail/" + toSlug(account.displayName).replace(/(\s+)/g, '-') + "." + account.uid}>
              <Button
                color="primary"
                variant="contained"
              >
                  <PersonOutlineIcon/> Xem user
              </Button>
            </Link>
        </div>
        <div>
            <Typography variant="h3" gutterBottom>
                { account.displayName }
            </Typography>
        </div>
      </div>
      <div className={classes.content}>
        <Box>
            <Card>
                <CardContent>
                    <form
                        onSubmit={ handleSubmit }
                    >
                        <Grid container spacing={5} className={ classes.customspace}>
                            <Grid 
                                item 
                                xs={12} 
                                sm={6}
                            >
                                <TextField
                                    required 
                                    fullWidth
                                    label="Họ tên"
                                    name="displayName"
                                    type="text"
                                    variant="outlined"
                                    defaultValue={ account.displayName }
                                    onChange={handleChange}
                                    error={hasError('displayName')}
                                    helperText={
                                        hasError('displayName') ? formState.errors.displayName[0] : null
                                    }
                                />
                                <TextField
                                    required 
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    defaultValue={ account.email }
                                    onChange={handleChange}
                                    error={hasError('email')}
                                    helperText={
                                        hasError('email') ? formState.errors.email[0] : null
                                    }
                                />
                                <TextField
                                    required 
                                    fullWidth
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    type="text"
                                    variant="outlined"
                                    defaultValue={ account.phoneNumber ? account.phoneNumber.replace("+84", "0") : '' }
                                    onChange={handleChange}
                                    error={hasError('phoneNumber')}
                                    helperText={
                                        hasError('phoneNumber') ? formState.errors.phoneNumber[0] : null
                                    }
                                />
                                <Box className={classes.upload}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={ !loadingButtonSave ? <PublishOutlinedIcon /> : <></>}
                                        onClick={ openUploadAvatar }
                                        disabled={loadingButtonSave}
                                    >
                                        Cập nhật avatar 
                                    </Button>
                                    <Avatar
                                      alt={account.displayName}
                                      className={classes.largeAvatar}
                                      src={account.photoURL}
                                    >
                                      {getInitials(account.displayName)}
                                    </Avatar>
                                </Box>
                            </Grid>
                            <Grid 
                                item 
                                xs={12} 
                                sm={6}
                            >
                                <SelectAddress list={ provinces } fullWidth={true} disable={!enableProvince} action={ getProvince } label="Tỉnh/thành phố" />
                                <SelectAddress list={districts} fullWidth={true} disable={!enableDistrict} action={ getDistrict } label="Quận/huyện" />
                                <SelectAddress list={communes} fullWidth={true} disable={!enableCommune} action={ getCommune } label="Phường/xã" />

                                <TextField
                                    fullWidth
                                    label="Số nhà/đường/thôn/xóm"
                                    name="street"
                                    type="text"
                                    variant="outlined"
                                    disabled={!enableStreet}
                                    defaultValue={address.street}
                                    onChange={ handleStreet }
                                />
                                <Typography variant="h6" color="textSecondary">
                                    Địa chỉ: { formOptions.street } { formOptions.commune } { formOptions.district } { formOptions.province }
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} className={ classes.customspace}>
                            <Grid 
                                item 
                                xs={12} 
                                sm={6}
                            >
                                <Typography variant="h5" color="textSecondary">
                                    Xác nhận email
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Nếu tắt hệ thống sẽ tự động gửi email yêu cầu người dùng xác thực lại
                                </Typography>
                                <ThemeProvider theme={themeButtonUpdate}>
                                    <Switch
                                        checked={emailVerify||account.emailVerified}
                                        onChange={handleChangeSwitch}
                                        color="primary"
                                        name="emailVerified"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} className={ classes.customspace}>
                            <Grid
                                item 
                                xs={12} 
                                sm={6}
                            >
                                
                                <ThemeProvider theme={themeButtonUpdate}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        type="submit"
                                        disabled={!formState.isValid}
                                    >
                                        CẬP NHẬT USER
                                    </Button>
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
      </div>
    </div>
  );
};

UserEditor.propTypes = {
    loading: PropTypes.bool.isRequired,
    loadingButtonSave: PropTypes.bool.isRequired,
    account: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,

    getUserEdit: PropTypes.func.isRequired,
    districtsBelongToProvince: PropTypes.func.isRequired,
    communesBelongToDistrict: PropTypes.func.isRequired,
    openUploadImg: PropTypes.func.isRequired,

    profileDetail: PropTypes.object.isRequired,
    provinces: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    communes: PropTypes.array.isRequired,
    enableProvince: PropTypes.bool.isRequired,
    enableDistrict: PropTypes.bool.isRequired,
    enableCommune: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    loading: state.dataMannegerUser.loadingEdit,
    loadingButtonSave: state.dataMannegerUser.loadingButtonSave,
    account: state.dataMannegerUser.accountEdit,
    address: state.dataMannegerUser.addressEdit,
    provinces: state.dataMannegerUser.provinces,

    districts: state.dataAdminProfile.districts,
    communes: state.dataAdminProfile.communes,
    enableProvince: state.dataAdminProfile.enableProvince,
    enableDistrict: state.dataAdminProfile.enableDistrict,
    enableCommune: state.dataAdminProfile.enableCommune,
});

const mapDispatchToProps = dispatch => ({
    getUserEdit: uid => dispatch( GetUserEdit(uid) ),

    districtsBelongToProvince: provinceCode => dispatch( DistrictBelongToProvince(provinceCode) ),
    communesBelongToDistrict: districtCode => dispatch( CommunesBelongToDistrict(districtCode) ),

    openUploadImg: content => dispatch({
      type: OPEN_DIALOG_UPLOAD_IMG,
      content: content
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEditor)