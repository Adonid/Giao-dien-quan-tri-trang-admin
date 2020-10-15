import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { connect } from 'react-redux';
import {
    Link as RouterLink
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
    Avatar
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { UploadCropSingleImage, SelectInput } from 'components';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(5)
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
    userName: {
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
    phone: {
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

    const { mockData, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {phone: mockData.require.phone , userName: mockData.require.userName , email: mockData.require.email },
    touched: {},
    errors: {}
  });
  const [formOptions, setFormOptions] = useState({
    province: 0,
    district: 0,
    commune: 0,
    street: ""
  });

  const [ emailVerify, setEmailVerify ] = useState(mockData.verifyEmail);

  const [ openUploader, setOpenUploader ] = useState(false);

  const [ dataImage, setDataImage ] = useState(mockData.avatar);

  const [ dataNewImage, setDataNewImage ] = useState(null);

  const [ listProvince, setListProvince ] = useState([{value: 0, label: "Tỉnh/thành phố"}]);
  const [ listDistrict, setListDistrict ] = useState([{value: 0, label: "Quận/huyện"}]);
  const [ listCommune, setListCommune ] = useState([{value: 0, label: "Phường/xã"}]);

  const [ disableDistrict, setDisableDistrict ] = useState(true);
  const [ disableCommune, setDisableCommune ] = useState(true);
  const [ disableStreet, setDisableStreet ] = useState(true);

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

  const getDataImage = imgBase64 => {
    setDataNewImage(imgBase64);
    setDataImage(imgBase64);
    // Thuc hien den day coi nhu da thay doi avatar
  };

  const getProvince = val => setFormOptions( formOptions => ({...formOptions, province: val}));
  const getDistrict = val => setFormOptions( formOptions => ({...formOptions, district: val}));
  const getCommune = val => setFormOptions( formOptions => ({...formOptions, commune: val}));

  const handleStreet = event => {
    event.persist();
    setFormOptions( formOptions => ({...formOptions, street: event.target.value}));
    };

  const handleSubmit = event => {
    event.preventDefault();
    const required = formState.values;
    const options = formOptions;
    const avatar = dataNewImage?dataNewImage.replace(/^data:image\/jpeg;base64,/, ""):null;
    props.updateUser({required, options, avatar, emailVerify})
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
                <Typography color="textPrimary">{ mockData.require.userName }</Typography>
            </Breadcrumbs>
            <Link color="inherit" underline="none" component={RouterLink} to="/users">
              <Button
                color="primary"
                variant="contained"
              >
                  <PeopleOutlineIcon/> Danh sách
              </Button>
            </Link>
        </div>
        <div>
            <Typography variant="h3" gutterBottom>
                { mockData.require.userName }
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
                                    name="userName"
                                    type="text"
                                    variant="outlined"
                                    defaultValue={ mockData.require.userName }
                                    onChange={handleChange}
                                    error={hasError('userName')}
                                    helperText={
                                        hasError('userName') ? formState.errors.userName[0] : null
                                    }
                                />
                                <TextField
                                    required 
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    defaultValue={ mockData.require.email }
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
                                    name="phone"
                                    type="text"
                                    variant="outlined"
                                    defaultValue={ mockData.require.phone }
                                    onChange={handleChange}
                                    error={hasError('phone')}
                                    helperText={
                                        hasError('phone') ? formState.errors.phone[0] : null
                                    }
                                />
                                <Box className={classes.upload}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={<PublishOutlinedIcon />}
                                        onClick={ () => setOpenUploader(!openUploader) }
                                    >
                                        Cập nhật avatar 
                                    </Button>
                                    <Avatar 
                                        alt="Remy Sharp" 
                                        src={ dataImage??null } 
                                        className={classes.largeAvatar} 
                                    />
                                </Box>
                            </Grid>
                            <Grid 
                                item 
                                xs={12} 
                                sm={6}
                            >
                                <SelectInput list={listProvince} action={ getProvince } label="Tỉnh/thành phố" />
                                <SelectInput list={listDistrict} action={ getDistrict } disable={disableDistrict} label="Quận/huyện" />
                                <SelectInput list={listCommune} action={ getCommune } disable={disableCommune} label="Phường/xã" />

                                <TextField
                                    fullWidth
                                    label="Số nhà/đường/thôn/xóm"
                                    name="street"
                                    type="text"
                                    variant="outlined"
                                    disabled={disableStreet}
                                    onChange={ handleStreet }
                                />
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
                                        checked={emailVerify}
                                        onChange={handleChangeSwitch}
                                        color="primary"
                                        name="emailVerify"
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
      <UploadCropSingleImage openDialog={openUploader} imageInit={dataImage} dataNewImg={ getDataImage} />
    </div>
  );
};

UserEditor.propTypes = {
    mockData: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    return {
        mockData: state.dataUserEditor.dataUser
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateUser: data => {
            dispatch({
                type: "UPDATE_USER",
                data: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditor)