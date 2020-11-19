import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Link as RouterLink,
  useParams
} from "react-router-dom";
import dayjs from 'dayjs';
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
    TextField,
    LinearProgress,
    CircularProgress
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EditAttributesOutlinedIcon from '@material-ui/icons/EditAttributesOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { toSlug } from 'helpers';
import { SelectInput } from 'components';
import { GetUserDetail, SendPasswordResetEmail, SendVerifyEmail } from 'redux/actions';
import { 
  OPEN_DIALOG_CONFIRM,
  UNLOCK_USERS,
  LOCK_USERS,
  DISTROY_USER
} from 'redux/constans';

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
    maxHeight: 150
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
    label: 'Gửi lại email xác nhận',
  }
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

  const {
    loading,
    loadingButtonSend,
    account,
    userStorage,
    getUserDetail,
    unLockUsers,
    lockUsers,
    distroyUsers,
    sendPasswordResetEmail,
    sendVerifyEmail,
  } = props;

  const { uid } = useParams();

  const classes = useStyles();

  const [ typeSend, setTypeSend ] = useState(1);

  const [ hidenTextField, setHidenTextField ] = useState(true);

  const [ contextNotify, setContextNotify ] = useState('Nothing');

  const listSendActions = lists;

  useEffect( () => {
    // Load du lieu nguoi dung o day
    getUserDetail(uid);
  },[]);

  const actionSend = val => {
    const value = Number(val);
    setTypeSend(value);
    // Neu la thong bao thi cho field hien len, neu khong de an
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

  const handleSend = async () => {
    // goi redux de tien hanh thuc thi
    switch (typeSend) {
      case 1:
        await sendPasswordResetEmail({uid: uid, time: dayjs().format('MM/DD/YYYY | hh:mm')});
        // await getUserDetail(uid);
        break;
    
      case 2:
        // gui thong bao: uid, contextNotify
        break;
    
      case 3:
        await sendVerifyEmail({uid: uid, time: dayjs().format('MM/DD/YYYY | hh:mm') });
        // await getUserDetail(uid);
        break;
    
      default:
        break;
    }
    // Gui xong roi
    typeSend===2?setContextNotify(''):null;
  }

  const handleUnlockUser = () => {
    const contentConfirm = {
      action: UNLOCK_USERS,
      type: 'open', 
      title: 'Mở khóa tài khoản ' + account.displayName, 
      note: account.displayName + ' sẽ được kích hoạt trở lại. Mở khóa tài khoản?'
    }
    unLockUsers(uid, contentConfirm);
  }

  const handleClockUser = () => {
    const contentConfirm = {
      action: LOCK_USERS,
      type: 'block', 
      title: 'Khóa tài khoản của ' + account.displayName, 
      note: account.displayName + ' sẽ bị dừng tất cả hoạt động cho đến khi bạn kích hoạt lại. Bạn có chắc?'
    }
    lockUsers([uid], contentConfirm);
  }

  const handleDistroyUser = () => {
    const contentConfirm = {
      action: DISTROY_USER,
      type: 'delete', 
      title: 'Xóa dữ liệu tài khoản của ' + account.displayName, 
      note: account.displayName + ' sẽ bị xóa hoàn toàn thông tin, chỉ những bài viết hoặc sản phẩm sẽ được giữ lại. Bạn có chắc?'
    }
    distroyUsers(uid, contentConfirm);
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
            <Link color="inherit" underline="none" component={RouterLink} to={"/user-editor/" + toSlug(account.displayName).replace(/(\s+)/g, '-') + "." + account.uid}>
              <Button
                color="primary"
                variant="contained"
              >
                  <EditAttributesOutlinedIcon/> Edit User
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
          <Grid container spacing={3}>
              <Grid 
                item 
                xs={12} 
                sm={6}
                md={4}
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
                            { account.email }
                          </Typography>
                          {
                            account.emailVerified
                            ?
                              <Typography variant="body2" className={ classes.textHighLightVerify }>
                                  EMAIL ĐÃ XÁC NHẬN
                              </Typography>
                            :
                              <Typography variant="body2" className={ classes.textHighLightNoVerify }>
                                EMAIL CHƯA XÁC THỰC
                              </Typography>
                          }
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
                              { account.phoneNumber }
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
                            { userStorage.address.province }
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
                            { userStorage.address.district }
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
                            { userStorage.address.commune }
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
                            { userStorage.address.street }
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
                              { props.postinfo.postUser } 
                          </Typography>
                          <Typography variant="body2" className={ classes.textHighLightInfo }>
                            { props.postinfo.postNoApproved }  chưa duyệt
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
                            { props.postinfo.topicPosted }
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
                            { props.postinfo.postUser } / { props.postinfo.postTotal } ({ 100*parseFloat(props.postinfo.postUser/props.postinfo.postTotal).toFixed(3)}%)
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
                            { props.postinfo.following }
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
                            { props.postinfo.rateAvg } / 5.0
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
                            { props.postinfo.replyComment } / { props.postinfo.allNotifyComment } ({ 100*parseFloat(props.postinfo.replyComment/props.postinfo.allNotifyComment).toFixed(3)}%)
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
                        value={contextNotify}
                        onChange={ handleTextField }
                      />
                    </Box>
                    <Box>
                      <ThemeProvider theme={themeButtonSend}>
                          <Button 
                              variant="contained" 
                              color="default" 
                              startIcon={ !loadingButtonSend ? <MailOutlineIcon fontSize="small" /> : <></>}
                              onClick={ handleSend }
                              disabled={ !Boolean(contextNotify)||loadingButtonSend}
                          >
                            {loadingButtonSend && <CircularProgress size={18} />}
                              GỬI
                          </Button>
                      </ThemeProvider>
                    </Box>
                    
                      <PerfectScrollbar className={ classes.maxHeightPerfectScrollbar }>
                        <Table>
                          <TableBody>
                            {
                              Object.values(userStorage.receives).map( item => 
                                <TableRow key={Math.floor(Math.random() * Math.floor(1000))}>
                                  <TableCell>
                                    <Typography variant="body2">
                                      { item.time }
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="body1" color="textSecondary">
                                        { item.type }
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              )
                            }
                          </TableBody>
                        </Table>
                      </PerfectScrollbar>
                    
                  </CardContent>
                </Card>

              </Grid>
              <Grid 
                item 
                xs={12} 
                sm={6}
                md={4}
              >
                <Card>
                  <CardHeader title="Hạn chế người dùng" />
                  <Divider/>
                  <CardContent>
                    <Box>
                      {
                        account.disabled 
                        ?
                        <Button 
                          startIcon={ <LockOpenIcon fontSize="small" />}
                          onClick={ handleUnlockUser }
                        >
                            MỞ KHÓA TÀI KHOẢN
                        </Button>
                        :
                        <Button 
                          startIcon={ <NotInterestedIcon fontSize="small" />}
                          onClick={ handleClockUser }
                        >
                            KHÓA TÀI KHOẢN
                        </Button>
                      }
                    </Box>
                    <Box className={ classes.textWarning}>
                        <Typography variant="body2" color="textSecondary">
                            Xóa toàn bộ dữ liệu của người dùng, nếu không chắc chắn bạn hãy chọn đóng tài khoản vì điều này sẽ xóa không trở lại.
                        </Typography>
                    </Box>
                    <ThemeProvider theme={themeButtonDelete}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={ <DeleteOutlinedIcon fontSize="small" />}
                            onClick={ handleDistroyUser }
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
    </div>
  );
};

UserDetail.propTypes = {
  getUserDetail: PropTypes.func.isRequired,
  unLockUsers: PropTypes.func.isRequired,
  lockUsers: PropTypes.func.isRequired,
  distroyUsers: PropTypes.func.isRequired,
  sendPasswordResetEmail: PropTypes.func.isRequired,
  sendVerifyEmail: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  userStorage: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingButtonSend: PropTypes.bool.isRequired,
}

  const mapStateToProps = state => ({
      postinfo: state.dataUserDetail.user.postinfo,

      loading: state.dataMannegerUser.loadingDetail,
      loadingButtonSend: state.dataMannegerUser.loadingButtonSend,
      account: state.dataMannegerUser.userDetail.account,
      userStorage: state.dataMannegerUser.userDetail.userStorage,
});

  const mapDispatchToProps = dispatch => ({

    getUserDetail: uid => dispatch( GetUserDetail(uid) ),

    lockUsers: (uid, content) => dispatch({
      type: OPEN_DIALOG_CONFIRM,
      dataConfirm: uid,
      contentConfirm: content
    }),
    unLockUsers: (uid, content) => dispatch({
      type: OPEN_DIALOG_CONFIRM,
      dataConfirm: uid,
      contentConfirm: content
    }),
    distroyUsers: (uid, content) => dispatch({
      type: OPEN_DIALOG_CONFIRM,
      dataConfirm: uid,
      contentConfirm: content
    }),
    sendPasswordResetEmail: uid => dispatch( SendPasswordResetEmail(uid) ),
    sendVerifyEmail: uid => dispatch( SendVerifyEmail(uid) ),
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);