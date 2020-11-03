import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { 
    Typography,
    Button,
    TextField,
    Dialog,
    Grid,
    CircularProgress
 } from '@material-ui/core';
import { connect } from 'react-redux';
import { CreateUser, GetAllUsers } from 'redux/actions';

 const schema = {
    userName: {
      presence: { allowEmpty: false, message: '^Tên không để trống' },
      length: {
        maximum: 32
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
    },
    email: {
      presence: { allowEmpty: false, message: 'không để trống' },
      email: true,
      length: {
        maximum: 64,
        message: "tối đa 64 ký tự!"
      }
    },
    password: {
      presence: { allowEmpty: false, message: '^Mật khẩu không để trống' },
      length: {
        maximum: 128,
        message: "^Mật khẩu tối đa 128 ký tự",
        minimum: 6,
        message: "^Mật khẩu tối thiểu 6 ký tự",
      },
      format: {
        pattern: "[a-zA-Z0-9]+",
        flags: "i",
        message: "^Chỉ bao gồm các ký tự số 0-9, chữ thường và hoa a-zA-Z"
      }
    }
  };

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

 const themeButtonAdd = createMuiTheme({
    palette: {
      primary : {
        main: '#4caf50',
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

const FormAddUser = props =>  {

    const { openForm, addNewUser, closeForm, loading, message, getAllUsers } = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });    

    useEffect(() => {
        const errors = validate(formState.values, schema);
    
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {}
        }));
      }, [formState.values]);

    var first = useRef(true);
    useEffect( () => {
      if(first.current){
        first.current = false;
        return;
      }
      setFormState(formState => ({
        ...formState,
        errors: !loading ? {message: message} : {}
      }));
    }, [loading]);
    
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
      };

    const handleSignUp = async (event) => {
        event.preventDefault();
        await addNewUser(formState.values);
        await getAllUsers();
      };

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;
    const hasErrorApi = field => formState.errors[field] ? true : false;

    return (
        <div>
        <Dialog disableBackdropClick disableEscapeKeyDown open={ openForm } onClose={ closeForm } aria-labelledby="form-dialog-title">
            <Grid
                className={classes.content}
            >
                <div className={classes.content}>
                    <div className={classes.contentBody}>
                        <form
                            className={classes.form}
                            onSubmit={handleSignUp}
                        >
                            <Typography
                                variant="h2"
                            >
                            Tạo tài khoản mới
                            </Typography>
                            <Typography
                            color="textSecondary"
                            gutterBottom
                            >
                            Sử dụng email và số điện thoại để tạo mới 1 tài khoản
                            </Typography>
                            <TextField
                            className={classes.textField}
                            error={hasError('userName')}
                            fullWidth
                            helperText={
                                hasError('userName') ? formState.errors.userName[0] : null
                            }
                            label="Họ tên"
                            name="userName"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.userName || ''}
                            variant="outlined"
                            />
                            <TextField
                            className={classes.textField}
                            error={hasError('phoneNumber')}
                            fullWidth
                            helperText={
                                hasError('phoneNumber') ? formState.errors.phoneNumber[0] : null
                            }
                            label="Số điện thoại"
                            name="phoneNumber"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.phoneNumber || ''}
                            variant="outlined"
                            />
                            <TextField
                            className={classes.textField}
                            error={hasError('email')}
                            fullWidth
                            helperText={
                                hasError('email') ? formState.errors.email[0] : null
                            }
                            label="Địa chỉ email"
                            name="email"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.email || ''}
                            variant="outlined"
                            />
                            <TextField
                            className={classes.textField}
                            error={hasError('password')}
                            fullWidth
                            helperText={
                                hasError('password') ? formState.errors.password[0] : null
                            }
                            label="Mật khẩu"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            value={formState.values.password || ''}
                            variant="outlined"
                            />
                            <TextField
                              className={classes.textField}
                              error={true}
                              fullWidth
                              helperText={
                                hasErrorApi('message') ? formState.errors.message : null
                              }
                              name="message"
                              type="hidden"
                              variant="outlined"
                            />
                            <div className={classes.groupButton}>
                                <ThemeProvider theme={themeButtonAdd}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        disabled={!formState.isValid||loading}
                                        type="submit"
                                    >
                                      { loading && <CircularProgress size={15}/> }  Thêm người dùng
                                    </Button>
                                </ThemeProvider>
                                <ThemeProvider theme={themeButtonClose}>
                                    <Button color="primary" className={classes.margin}  onClick={ closeForm }>
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

FormAddUser.propTypes = {
  openForm : PropTypes.bool.isRequired,
  loading : PropTypes.bool.isRequired,
  closeForm : PropTypes.func.isRequired,
  addNewUser: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.dataMannegerUser.loadingCreate,
  message: state.dataMannegerUser.messageCreate
});

const mapDispatchToProps = dispatch => ({

  getAllUsers: () => dispatch( GetAllUsers() ),

  closeForm: () => dispatch({type: 'CLOSE_FORM_ADD_USER'}),

  addNewUser: userInfo => dispatch( CreateUser( userInfo )),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(FormAddUser)