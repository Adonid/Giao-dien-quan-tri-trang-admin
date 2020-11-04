import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Link as RouterLink,
  useParams
} from "react-router-dom";
import moment from 'moment';
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
    LinearProgress
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EditAttributesOutlinedIcon from '@material-ui/icons/EditAttributesOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { SelectInput } from 'components';
import { ConfirmDialog } from 'alerts';
import { GetUserDetail } from 'redux/actions';

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

  const {
    loading,
    account,
    userStorage,
    getUserDetail
  } = props;

  const { uid } = useParams();

  const classes = useStyles();

  const [ typeSend, setTypeSend ] = useState(1);

  const [ hidenTextField, setHidenTextField ] = useState(true);

  const [ contextNotify, setContextNotify ] = useState('Nothing');

  const [ openBlock, setOpenBlock ] = useState(false);
  const [ openOpen, setOpenOpen ] = useState(false);
  const [ openDistroy, setOpenDistroy ] = useState(false);

  const listSendActions = lists;

  useEffect( () => {
    // Load du lieu nguoi dung o day
    getUserDetail(uid);
  });

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
    const u = {
      id: props.userinfo.id,
      email: props.userinfo.email,
      name: props.userinfo.name,
      type: typeSend,
      notify: contextNotify,
      isClosed: props.userinfo.isClosed
    }
    props.actionSend(u);
    // Gui xong roi
    typeSend===2?setContextNotify(''):null;
  }

  const handleBlocking = () => props.closeAccount({id: props.userinfo, name: props.userinfo.name});

  const handleOpening = () => props.openAccount({id: props.userinfo, name: props.userinfo.name});

  const handleDistroyUser = () => props.distroyAccount({id: props.userinfo, name: props.userinfo.name});

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
                <Typography color="textPrimary">{ props.userinfo.name }</Typography>
            </Breadcrumbs>
            <Link color="inherit" underline="none" component={RouterLink} to="/user-editor">
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
              { props.userinfo.name }
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
                            { props.userinfo.email.address }
                          </Typography>
                          {
                            props.userinfo.email.verify
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
                              { props.userinfo.phone }
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
                            { props.userinfo.address.province }
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
                            { props.userinfo.address.district }
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
                            { props.userinfo.address.commune }
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
                            { props.userinfo.address.street }
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
                              startIcon={ <MailOutlineIcon fontSize="small" />}
                              onClick={ handleSend }
                              disabled={Boolean(contextNotify) ? false : true}
                          >
                              GỬI
                          </Button>
                      </ThemeProvider>
                    </Box>
                    
                      <PerfectScrollbar className={ classes.maxHeightPerfectScrollbar }>
                        <Table>
                          <TableBody>
                            {
                              props.listSent.map( item => 
                                <TableRow key={item.dateTime}>
                                  <TableCell>
                                    <Typography variant="body2">
                                      {moment(item.dateTime).format('DD/MM/YYYY | HH:MM')}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="body1" color="textSecondary">
                                        { item.reason }
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
                        props.userinfo.isClosed 
                        ?
                        <Button 
                          startIcon={ <LockOpenIcon fontSize="small" />}
                          onClick={ ()=>setOpenOpen(!openOpen) }
                        >
                            MỞ TÀI KHOẢN
                        </Button>
                        :
                        <Button 
                          startIcon={ <NotInterestedIcon fontSize="small" />}
                          onClick={ ()=>setOpenBlock(!openBlock) }
                        >
                            ĐÓNG TÀI KHOẢN
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
      <ConfirmDialog action={ handleBlocking } openDialog={openBlock} content={{type:'block', title:'Đóng tài khoản người dùng', note:`Tài khoản người dùng ${ props.userinfo.name } sẽ bị vô hiệu hóa cho đến khi bạn cho phép kích hoạt trở lại. Đóng tài khoản?`}} />
      <ConfirmDialog action={ handleOpening } openDialog={openOpen} content={{type:'open', title:'Mở khóa tài khoản người dùng', note:`Tài khoản người dùng ${ props.userinfo.name } sẽ được phép hoạt động trở lại. Mở khóa cho tài khoản?`}} />
      <ConfirmDialog action={ handleDistroyUser } openDialog={openDistroy} content={{type:'delete', title:'Xóa vĩnh viễn tài khoản người dùng', note:`Tài khoản ${ props.userinfo.name } sẽ bị xóa hoàn toàn trên hệ thống, thực thi sẽ không khôi phục được. Bạn có chắc?`}}/>
    </div>
  );
};

UserDetail.propTypes = {
  getUserDetail: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  userStorage: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

  const mapStateToProps = state => ({
      userinfo: state.dataUserDetail.user.userinfo,
      postinfo: state.dataUserDetail.user.postinfo,
      listSent: state.dataUserDetail.user.listSent,

      loading: state.dataMannegerUser.loadingDetail,
      account: state.dataMannegerUser.userDetail.account,
      userStorage: state.dataMannegerUser.userDetail.userStorage,
});

  const mapDispatchToProps = dispatch => ({
    actionSend: user => {
      dispatch({
        type : 'ACTION_SEND',
        user : user
      })
    },
    closeAccount: user => {
      dispatch({
        type : 'CLOSE_ACCOUNT',
        user : user
      })
    },
    openAccount: user => {
      dispatch({
        type : 'OPEN_ACCOUNT',
        user : user
      })
    },
    distroyAccount: user => {
      dispatch({
        type : 'DISTROY_ACCOUNT',
        user : user
      })
    },

    getUserDetail: uid => dispatch( GetUserDetail(uid) )
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);