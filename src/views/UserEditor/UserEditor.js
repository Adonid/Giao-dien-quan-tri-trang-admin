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
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { UploadCropSingleImage } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(5)
  },
  customspace: {
    '& .MuiGrid-root': {
        '& .MuiTextField-root': {
            marginTop: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5),
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
  }
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

  const handleChangeSwitch = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const getDataImage = imgBase64 => {
    setDataNewImage(imgBase64);
    setDataImage(imgBase64);
    console.log(imgBase64);
  };

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
                                        src={ dataImage } 
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
                                <TextField
                                    fullWidth
                                    label="Tỉnh/thành phố"
                                    name="province"
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Quận/huyện"
                                    name="district"
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Phường/xã"
                                    name="commune"
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Số nhà/đường/thôn/xóm"
                                    name="street"
                                    type="text"
                                    variant="outlined"
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
                                        checked={state.spacingcheckEmailVerify}
                                        onChange={handleChangeSwitch}
                                        color="primary"
                                        name="checkEmailVerify"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </ThemeProvider>
                            </Grid>
                            <Grid 
                                item 
                                xs={12} 
                                sm={6}
                                spacing={3}
                            >
                                <Typography variant="h5" color="textSecondary">
                                    Discounted Prices
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    This will give the user discounted prices for all products
                                </Typography>
                                <ThemeProvider theme={themeButtonUpdate}>
                                    <Switch
                                        checked={state.checkOption}
                                        onChange={handleChangeSwitch}
                                        color="primary"
                                        name="checkOption"
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