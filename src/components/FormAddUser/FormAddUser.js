import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { 
    Typography,
    Button,
    TextField,
    Dialog,
    Grid
 } from '@material-ui/core';

 const schema = {
    firstName: {
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

    const { openCall, ...rest} = props;

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
      });
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    

    useEffect(() => {
        const errors = validate(formState.values, schema);
    
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {}
        }));
      }, [formState.values]);

      /** Khong xuat hien dialog lan dau khi chay. Khoi tao cac useState ve tt ban dau */
    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setOpen(true);
    },[openCall])
    /** End */

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    const handleSignUp = event => {
        event.preventDefault();
        if (!loading) {
          setSuccess(false);
          setLoading(true);
          setOpenBackdrop(true);
          // THOI GIAN XU LY API O DAY!
          timer.current = setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            // vi du ve chuyen huong qua trang quen mat khau sau khi call api
            history.push('/create-account-success');
          }, 2000);
        }
      };

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                            Sử dụng email để tạo mới 1 tài khoản
                            </Typography>
                            <TextField
                            className={classes.textField}
                            error={hasError('firstName')}
                            fullWidth
                            helperText={
                                hasError('firstName') ? formState.errors.firstName[0] : null
                            }
                            label="Họ tên"
                            name="firstName"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.firstName || ''}
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
                            <div className={classes.groupButton}>
                                <ThemeProvider theme={themeButtonAdd}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        disabled={!formState.isValid||loading}
                                        onClick={handleClose}>
                                        Thêm người dùng
                                    </Button>
                                </ThemeProvider>
                                <ThemeProvider theme={themeButtonClose}>
                                    <Button color="primary" className={classes.margin}  onClick={handleClose}>
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
    
};

export default FormAddUser;