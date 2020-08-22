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
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [formChecked, setFormChecked] = useState({
    comment: true,
    system: false,
    user: true
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
    console.log(formChecked);
    // call api
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
                    name="comment"
                    defaultChecked={ formChecked.comment }
                    onChange={ handleChange }
                  />
                }
                label="Từ bình luận bài viết"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="system"
                    defaultChecked={ formChecked.system }
                    onChange={ handleChange }
                  />
                }
                label="Từ hệ thống"
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
                    defaultChecked
                    disabled 
                  />
                }
                label="Từ Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="user"
                    defaultChecked={ formChecked.user }
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
          >
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
