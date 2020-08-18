import React, { useState } from 'react';
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

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(5)
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

const themeButtonUpdate = createMuiTheme({
    palette: {
        primary : {
        main: '#5850EC',
        contrastText: '#fff',
        },
    },
});

const UserEditor = props => {

  const classes = useStyles();

  const [state, setState] = useState({
    checkEmailVerify: false,
    checkOption: false,
  });

  const [ openUploader, setOpenUploader ] = useState(false);

  const [ dataImage, setDataImage ] = useState('/images/products/product_1.png');

  const [ dataNewImage, setDataNewImage ] = useState('');

  const [ listProvince, setListProvince ] = useState([{value: 0, label: "Tỉnh/thành phố"}]);
  const [ listDistrict, setListDistrict ] = useState([{value: 0, label: "Quận/huyện"}]);
  const [ listCommune, setListCommune ] = useState([{value: 0, label: "Phường/xã"}]);

  const [ disableDistrict, setDisableDistrict ] = useState(true);
  const [ disableCommune, setDisableCommune ] = useState(true);
  const [ disableStreet, setDisableStreet ] = useState(true);

  const handleChangeSwitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeInput = event => {

  }

  const getDataImage = imgBase64 => {
    setDataNewImage(imgBase64);
    setDataImage(imgBase64);
    // Thuc hien den day coi nhu da thay doi avatar
  };

  const getProvince = val => {
      console.log(val);
  }
  const getDistrict = val => {
    console.log(val);
  }
  const getCommune = val => {
    console.log(val);    
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
                <Typography color="textPrimary">Ng. Van A</Typography>
            </Breadcrumbs>
        </div>
        <div>
            <Typography variant="h3" gutterBottom>
                Ng. Van A
            </Typography>
        </div>
      </div>
      <div className={classes.content}>
        <Box>
            <Card>
                <CardContent>
                    <form>
                        <Grid container spacing={5} className={ classes.customspace}>
                            <Grid 
                                item 
                                xs={12} 
                                sm={6}
                                spacing={3}
                            >
                                <TextField
                                    required 
                                    fullWidth
                                    label="Họ tên"
                                    name="userName"
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    required 
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                />
                                <TextField
                                    required 
                                    fullWidth
                                    label="Số điện thoại"
                                    name="phone"
                                    type="text"
                                    variant="outlined"
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
                                spacing={3}
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
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={5} className={ classes.customspace}>
                            <Grid 
                                item 
                                xs={12} 
                                sm={6}
                                spacing={3}
                            >
                                <Typography variant="h5" color="textSecondary">
                                    Xác nhận email
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Nếu tắt hệ thống sẽ tự động gửi email yêu cầu người dùng xác thực lại
                                </Typography>
                                <ThemeProvider theme={themeButtonUpdate}>
                                    <Switch
                                        checked={state.checkEmailVerify}
                                        onChange={handleChangeSwitch}
                                        color="primary"
                                        name="checkEmailVerify"
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
                                spacing={3}
                            >
                                
                                <ThemeProvider theme={themeButtonUpdate}>
                                    <Button variant="contained" color="primary" disableElevation type="submit">
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


export default UserEditor;