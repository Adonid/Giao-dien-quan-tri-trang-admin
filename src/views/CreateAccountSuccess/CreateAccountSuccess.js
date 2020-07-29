import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  CardContent,
  Card,
  Typography,
  Link
} from '@material-ui/core';

const imageCheckDone = "/images/login/check_done.jpg";

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
  content: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(8)
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
    },
    backgroundColor: 'white'
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: '5px auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  backgroundCard: {
    backgroundColor: 'white'
  }
}));

const CreateAccountSuccess = props => {
  const { history, className, product, ...rest  } = props;

  const classes = useStyles();

  const handleBack = () => {
    history.push('/sign-in');
  };

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
          <div>
            <div className={classes.contentBody}>
            <Card
                {...rest}
                className={clsx(classes.backgroundCard, className)}
                >
                <CardContent>
                    <div className={classes.imageContainer}>
                    <img
                        alt="Product"
                        className={classes.image}
                        src={imageCheckDone}
                    />
                    </div>
                    <Typography
                    align="center"
                    gutterBottom
                    variant="h4"
                    >
                        TẠO TÀI KHOẢN THÀNH CÔNG
                    </Typography>
                    <Typography
                    align="center"
                    variant="body1"
                    >
                     Tài khoản của bạn đã được tạo thành công, vui lòng <Link onClick={handleBack} component="button" variant="h6">đăng nhập</Link> vào hệ thống.
                    </Typography>
                </CardContent>
            </Card>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

CreateAccountSuccess.propTypes = {
  history: PropTypes.object
};

export default withRouter(CreateAccountSuccess);
