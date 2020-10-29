import React from 'react';
import PropTypes from 'prop-types';
import {
  Link as RouterLink
} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Button, 
  Typography,
  Breadcrumbs,
  Link
 } from '@material-ui/core';
 import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
 import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
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
  }
}));

const UsersToolbar = props => {
  const { className, openForm, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" gutterBottom>
          <Link color="inherit" component={RouterLink} to="/dashboard">
              Dashboard
          </Link>
          <Typography color="textPrimary">Quản lý người dùng</Typography>
        </Breadcrumbs>
        <Button
          color="primary"
          variant="contained"
          onClick={ openForm }
          disableunderline="true"
        >
          <PersonAddOutlinedIcon/> Thêm mới
        </Button>
      </div>
      <div>
        <Typography variant="h3" gutterBottom>
          Quản lý người dùng
        </Typography>
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  openForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    openForm: () => dispatch({type: 'OPEN_FORM_ADD_USER'}),
});

export default connect(null, mapDispatchToProps)(UsersToolbar)
