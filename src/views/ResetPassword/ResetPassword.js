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
  Typography,
  CircularProgress
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BackDrop } from 'elements';

const schema = {
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
  repassword: {
    presence: { allowEmpty: false, message: '^Không để trống' },
    equality: {
      attribute: "password",
      message: "^Mật khẩu không khớp!",
      comparator: function(v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2);
      }
    }
  },
  verifycode: {
    presence: { allowEmpty: false, message: '^Nhập mã xác minh!' },
    length: {
      is: 8,
      message: "^Mã xác minh đúng 8 ký tự",
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
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  paragrapText: {
    marginTop: theme.spacing(0.5)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const ResetPassword = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
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

  const handleSignIn = event => {
    event.preventDefault();
    // HÃY XỬ LÝ DỮ LIỆU Ở ĐÂY!
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setOpenBackdrop(true);
      // THOI GIAN XU LY API O DAY!
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        // vi du ve chuyen huong qua trang lay mat khau sau khi call api
        history.push('/');
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
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Khôi phục mật khẩu
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                Đặt lại mật khẩu mới
                </Typography>
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
                  error={hasError('repassword')}
                  fullWidth
                  helperText={
                    hasError('repassword') ? formState.errors.repassword[0] : null
                  }
                  label="Nhập lại mật khẩu"
                  name="repassword"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.repassword || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('verifycode')}
                  fullWidth
                  helperText={
                    hasError('verifycode') ? formState.errors.verifycode[0] : null
                  }
                  label="Mã xác minh"
                  name="verifycode"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.verifycode || ''}
                  variant="outlined"
                />
                <Typography
                  className={classes.paragrapText}
                  variant="caption" 
                  display="block" 
                  gutterBottom
                >
                  Mã xác minh gồm 8 ký tự đã được gửi vào email của bạn.
                </Typography>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid||loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />} Đổi mật khẩu
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
      <BackDrop open={openBackdrop} />
    </div>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.object
};

export default withRouter(ResetPassword);
