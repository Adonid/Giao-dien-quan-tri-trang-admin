import React, { useState } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { 
    Breadcrumbs, 
    Link, 
    Typography, 
    Button,
    Grid,
    Card,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Box,
    CardContent,
    createMuiTheme,
    TextField
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EditAttributesOutlinedIcon from '@material-ui/icons/EditAttributesOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { SelectInput } from 'components';
import { ConfirmDialog } from 'alerts';

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
  groupButton: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    '& button': {
      marginRight: theme.spacing(1),
    }
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  textHighLightVerify: {
    color: '#4caf50',
    backgroundColor: '#4caf5014',
    fontWeight: 500,
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 3,
  },
  textHighLightNoVerify:{
    color: '#ffab40',
    backgroundColor: '#ffefc2',
    fontWeight: 500,
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 3,
  },
  textHighLightInfo: {
    color: '#29b6f6',
    backgroundColor: '#e6f8fb',
    fontWeight: 500,
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 3,
  },
  buttonDelete: {
    color: '#fff',
    backgroundColor: '#f44336',
  },
  textWarning: {
    paddingBottom: theme.spacing(1),
    '& >p' : {
      color: '#546e7ad9'
    }
  },
  contentSend: {
    '& .MuiBox-root': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  },
  maxHeightPerfectScrollbar: {
    maxHeight: 123
  },
  isHidenField: {
    display: 'none'
  }
}));

const lists = [
  {
    value: '1',
    label: 'Gửi email để reset password',
  },
  {
    value: '2',
    label: 'Gửi thông báo',
  },
  {
    value: '3',
    label: 'Gửi email nhắc nhở',
  },
  {
    value: '4',
    label: 'Gửi email cảnh báo đóng tài khoản',
  },
];

const themeButtonSend = createMuiTheme({
  palette: {
    default : {
      main: '#d5d5d5ad',
      contrastText: '#000000de',
    },
  },
});

const themeButtonDelete = createMuiTheme({
  palette: {
    primary : {
      main: '#f44336',
      contrastText: '#fff',
    },
  },
});

const UserDetail = props => {

  const classes = useStyles();

  const [ typeSend, setTypeSend ] = useState(1);

  const [ hidenTextField, setHidenTextField ] = useState(true);

  const [ contextNotify, setContextNotify ] = useState('Nothing');

  const [ openBlock, setOpenBlock ] = useState(false);
  const [ openDistroy, setOpenDistroy ] = useState(false);

  const listSendActions = lists;

  const actionSend = val => {
    const value = Number(val);
    setTypeSend(value);
    // Neu la thong bao cho field hien len, neu khong de an
    if(value===2){
      setHidenTextField(false);
      setContextNotify('');
    }
    else{
      setHidenTextField(true);
      setContextNotify('Nothing');
    }
    // end
  }

  const handleTextField = val => setContextNotify(val.target.value);

  const handleSend = () => {
    // goi redux de tien hanh thuc thi
    
    // Gui xong roi
    setContextNotify('');
  }

  const handleBlocking = () => {
    console.log('being block');
  }

  const handleDistroyUser = () => {
    console.log('being distroy');
  }

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.row}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" gutterBottom>
                <Link color="inherit" component="button">
                    Dashboard
                </Link>
                <Link color="inherit" component="button">
                  Quản lý người dùng
                </Link>
                <Typography color="textPrimary">Phan Tien Dung</Typography>
            </Breadcrumbs>
            <Button
            color="primary"
            variant="contained"
            // onClick={ showModalAddUser }
            >
                <EditAttributesOutlinedIcon/> Edit User
            </Button>
        </div>
        <div>
            <Typography variant="h3" gutterBottom>
              Phan Tien Dung
            </Typography>
        </div>
      </div>
      <div className={classes.content}>
        <Box>
          <Grid container spacing={5}>
              <Grid 
                item 
                xs={12} 
                sm={6}
                md={4}
                spacing={3}
              >
                <Card>
                  <CardHeader title="Thông tin người dùng" />
                  <Divider/>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Email
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              xavan912@gmail.com
                          </Typography>
                          <Typography variant="span" className={ classes.textHighLightVerify }>
                              EMAIL ĐÃ XÁC NHẬN
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Phone
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              0944637733
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Tỉnh/Thành phố
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              Kiên Giang
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Huyện/Quận
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              Phú Quốc
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Phường/Xã/T.Trấn
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              Th.Trấn An Thới
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Số nhà/đường/thôn
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              100 Nguyễn Văn Cừ
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </Grid>
              <Grid 
                item 
                xs={12} 
                sm={6}
                md={4}
                spacing={3}
              >
                <Card>
                  <CardHeader title="Thông tin viết bài" />
                  <Divider/>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Tổng số bài viết
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              12
                          </Typography>
                          <Typography variant="span" className={ classes.textHighLightInfo }>
                              3 chưa duyệt
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Số chủ đề đã đăng
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              3
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Tỉ lệ bài viết
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              12 / 48 (25%)
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Lượt người theo dõi
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              76
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Đánh giá trung bình
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              4.8 / 5.0
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">
                              Tỉ lệ reply comment
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" color="textSecondary">
                              39 / 107
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </Grid>
              <Grid 
                item 
                xs={12} 
                sm={6}
                md={4}
                spacing={3}
              >
                <Card>
                  <CardHeader title="Gửi email / thông báo" />
                  <Divider/>
                  <CardContent className={ classes.contentSend}>
                    <SelectInput label="Chọn hành động" list={ listSendActions } action={ val => actionSend(val) } />
                    <Box className={ hidenTextField ? classes.isHidenField : null }>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Nội dung thông báo"
                        multiline
                        rowsMax={3}
                        fullWidth={true}
                        autoComplete
                        value={contextNotify}
                        onChange={ handleTextField }
                      />
                    </Box>
                    <Box>
                      <ThemeProvider theme={themeButtonSend}>
                          <Button 
                              variant="contained" 
                              color="default" 
                              startIcon={ <MailOutlineIcon fontSize="small" />}
                              onClick={ handleSend }
                              disabled={Boolean(contextNotify) ? false : true}
                          >
                              GỬI
                          </Button>
                      </ThemeProvider>
                    </Box>
                    <Table>
                      <TableBody>
                        <PerfectScrollbar className={ classes.maxHeightPerfectScrollbar }>
                          <TableRow>
                            <TableCell>
                              <Typography variant="p">
                                  08/08/2020 | 03:08
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" color="textSecondary">
                                  Gửi link reset password
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant="p">
                                  08/08/2020 | 03:08
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" color="textSecondary">
                                  Gửi link reset password
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant="p">
                                  08/08/2020 | 03:08
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" color="textSecondary">
                                  Gửi link reset password
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </PerfectScrollbar>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

              </Grid>
              <Grid 
                item 
                xs={12} 
                sm={6}
                md={4}
                spacing={3}
              >
                <Card>
                  <CardHeader title="Hạn chế người dùng" />
                  <Divider/>
                  <CardContent>
                    <Box>
                        <Button 
                          startIcon={ <NotInterestedIcon 
                          fontSize="small" />}
                          onClick={ ()=>setOpenBlock(!openBlock) }
                        >
                            ĐÓNG TÀI KHOẢN
                        </Button>
                    </Box>
                    <Box className={ classes.textWarning}>
                        <Typography variant="body2" color="textSecondary">
                            Xóa toàn bộ dữ liệu của người dùng này, nếu không chắc chắn bạn hãy chọn đóng tài khoản vì điều này sẽ xóa không trở lại.
                        </Typography>
                    </Box>
                    <ThemeProvider theme={themeButtonDelete}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={ <DeleteOutlinedIcon fontSize="small" />}
                          onClick={ ()=>setOpenDistroy(!openDistroy) }
                        >
                            XÓA TÀI KHOẢN
                        </Button>
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Box>
      </div>
      <ConfirmDialog action={ handleBlocking } openDialog={openBlock} content={{type:'block', title:'Đóng tài khoản người dùng', note:'Tài khoản người dùng này sẽ bị vô hiệu hóa cho đến khi bạn cho phép kích hoạt trở lại. Đóng tài khoản?'}} />
      <ConfirmDialog action={ handleDistroyUser } openDialog={openDistroy} content={{type:'delete', title:'Xóa vĩnh viễn tài khoản người dùng này', note:'Tài khoản người dùng này sẽ bị xóa hoàn toàn trên hệ thống, thực thi sẽ không khôi phục được. Bạn có chắc?'}}/>
    </div>
  );
};

export default UserDetail;