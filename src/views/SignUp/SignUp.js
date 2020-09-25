import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  CircularProgress
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  },
  policy: {
    presence: { allowEmpty: false, message: '^Cần được chấp nhận' },
    checked: {
      is: true,
      message: '^Cần được chấp nhận'
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
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
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

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
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = event => {
    event.preventDefault();
    console.log(formState.values);
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      // THOI GIAN XU LY API O DAY!
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        // vi du ve chuyen huong qua trang quen mat khau sau khi call api
        history.push('/sign-in');
      }, 2000);
    }
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Tự hào kết nối trí tuệ Việt.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Lê Đình Hiệu
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Quản trị trang Website
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignUp}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Tạo tài khoản mới
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Sử dụng email & số điện thoại của bạn để lập mới tài khoản
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
                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    Tôi đã đọc & chấp nhận{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="/terms-used"
                      underline="always"
                      variant="h6"
                    >
                      Điều khoản & điều lệ
                    </Link>
                  </Typography>
                </div>
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid||loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />} Tạo tài khoản
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Đã có tài khoản?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    Đăng nhập
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default SignUp;
