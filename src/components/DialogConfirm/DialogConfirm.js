import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Typography, 
  Grid,
  CircularProgress
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { connect } from 'react-redux';
import { LockUsers } from 'redux/actions';
import { 
  LOCK_USERS,
  CLOSE_DIALOG_CONFIRM
} from 'redux/constans';

const useStyles = makeStyles((theme) => ({
  root: {},
    margin: {
      margin: theme.spacing(1),
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
          justifyContent: 'center'
        }
    },
    form: {
        padding: theme.spacing(5),
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2)
        }
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    groupButton: {
        marginTop: theme.spacing(3)
    }
}));

const themeButtonDelete = createMuiTheme({
  palette: {
    primary : {
      main: '#f44336',
      contrastText: '#fff',
    },
  },
});

const themeButtonClose = createMuiTheme({
  palette: {
    primary : {
      main: '#d0d0d0'
    },
  },
});

const themeButtonBlock = createMuiTheme({
  palette: {
    default : {
      main: '#9e9e9e29',
      contrastText: '#fff',
    },
  },
});

const themeButtonOpen = createMuiTheme({
  palette: {
    primary : {
      main: '#4caf50',
      contrastText: '#fff',
    },
  },
});

const DialogConfirm = props => {

  const { 
    lockUsers, 
    content, 
    openConfirm, 
    closeDialogConfirm, 
    loading, 
    dataConfirm 
  } = props;

  const classes = useStyles();

  const handleConfirm = () => {
    switch (content.action) {
      case LOCK_USERS:
        lockUsers(dataConfirm);
        console.log(dataConfirm);
        break;
    
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog
        disableBackdropClick 
        disableEscapeKeyDown
        open={openConfirm}
        onClose={closeDialogConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid className={classes.content}>
          <div className={classes.content}>
              <div className={classes.contentBody}>
                  <form
                      className={classes.form}
                  >
                      <Typography
                          gutterBottom
                          variant="h2"
                      >
                      { content.title }
                      </Typography>
                      <Typography
                      color="textSecondary"
                      gutterBottom
                      >
                      { content.note }
                      </Typography>
                      <div className={classes.groupButton}>
                          {
                            content.type==='delete'
                            ?
                            <ThemeProvider theme={themeButtonDelete}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={ handleConfirm }
                                    startIcon={<DeleteOutlineIcon />}
                                    disabled={loading}
                                >
                                    {loading && <CircularProgress size={18} />} ok, Xóa tài khoản
                                </Button>
                            </ThemeProvider>
                            :
                              content.type==='block'
                              ?
                              <ThemeProvider theme={themeButtonBlock}>
                                <Button 
                                    variant="contained" 
                                    onClick={ handleConfirm }
                                    startIcon={<NotInterestedIcon />}
                                    disabled={loading}
                                >
                                    {loading && <CircularProgress size={18} />} ok, Đóng tài khoản
                                </Button>
                              </ThemeProvider>
                              :
                                content.type==='denied'
                                ?
                                <ThemeProvider theme={themeButtonBlock}>
                                  <Button 
                                      variant="contained" 
                                      onClick={ handleConfirm }
                                      startIcon={<NotInterestedIcon />}
                                      disabled={loading}
                                  >
                                      {loading && <CircularProgress size={18} />} ok, Dừng đăng
                                  </Button>
                                </ThemeProvider>
                                :
                                  content.type==='approve'
                                  ?
                                    <ThemeProvider theme={themeButtonOpen}>
                                      <Button 
                                          variant="contained" 
                                          color="primary"
                                          onClick={ handleConfirm }
                                          startIcon={<LockOpenIcon />}
                                          disabled={loading}
                                      >
                                          {loading && <CircularProgress size={18} />} ok, Đăng lại
                                      </Button>
                                    </ThemeProvider>
                                  :
                                    <ThemeProvider theme={themeButtonOpen}>
                                      <Button 
                                          variant="contained" 
                                          color="primary"
                                          onClick={ handleConfirm }
                                          startIcon={<LockOpenIcon />}
                                          disabled={loading}
                                      >
                                          {loading && <CircularProgress size={18} />} ok, Mở tài khoản
                                      </Button>
                                    </ThemeProvider>
                          }
                          <ThemeProvider theme={themeButtonClose}>
                              <Button color="primary" className={classes.margin}  onClick={ closeDialogConfirm } >
                                  Đóng lại
                              </Button>
                          </ThemeProvider>
                      </div>
                  </form>
              </div>
          </div>
        </Grid>
      </Dialog>
    </div>
  );
}

DialogConfirm.propTypes = {
  content: PropTypes.object.isRequired,
  dataConfirm: PropTypes.array.isRequired,
  openConfirm: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,

  lockUsers: PropTypes.func.isRequired,
  closeDialogConfirm: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    openConfirm: state.dataMessage.openConfirm,
    loading: state.dataMessage.loadingConfirm,
    content: state.dataMessage.contentConfirm,
    dataConfirm: state.dataMessage.dataConfirm,
});

const mapDispatchToProps = dispatch => ({
    lockUsers: uids => dispatch( LockUsers(uids) ),
    closeDialogConfirm: () => dispatch({type: CLOSE_DIALOG_CONFIRM}),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogConfirm);