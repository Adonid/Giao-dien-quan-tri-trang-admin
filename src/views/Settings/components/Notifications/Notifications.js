import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import { UpdateNotifyRules } from 'redux/actions';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = props => {
  const { className, loading, updateNotifyRules , notifyRules, ...rest } = props;

  const classes = useStyles();

  const [formChecked, setFormChecked] = useState({
    user: notifyRules.getUserEmail,
    admin: notifyRules.getAdminEmail,
    comment: notifyRules.getComment,
  });

  const handleChange = event => {
    event.persist();

    setFormChecked(formChecked => ({
      ...formChecked,
      [event.target.name]: event.target.checked
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateNotifyRules(formChecked);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={ handleSubmit }>
        <CardHeader
          subheader="Quản lý thông báo"
          title="Thông báo"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Nhận thông báo
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                    disabled
                  />
                }
                label="Từ Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked
                    disabled
                  />
                }
                label="Từ hệ thống"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="comment"
                    defaultChecked={ notifyRules.getComment }
                    onChange={ handleChange }
                  />
                }
                label="Từ bình luận bài viết"
              />
            </Grid>
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
              >
                Nhận email
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                    disabled 
                  />
                }
                label="Hệ thống"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    color="primary"
                    name="admin"
                    defaultChecked={ notifyRules.getAdminEmail }
                    onChange={ handleChange }
                  />
                }
                label="Từ Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="user"
                    defaultChecked={ notifyRules.getUserEmail }
                    onChange={ handleChange }
                  />
                }
                label="Từ người dùng"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            disabled={loading}
          >
            {loading && <CircularProgress size={15} />} Áp dụng
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  notifyRules: PropTypes.object.isRequired,

  updateNotifyRules: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.dataNotifyRules.loadingSaveNotify
});

const mapDispatchToProps = dispatch => ({
    updateNotifyRules: newRules => dispatch( UpdateNotifyRules(newRules) ),
});


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
