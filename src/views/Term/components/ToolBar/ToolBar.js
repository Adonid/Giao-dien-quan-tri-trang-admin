import React from 'react';
import PropTypes from 'prop-types';
import {
  Link as RouterLink
} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Breadcrumbs,
  Link
 } from '@material-ui/core';
 import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(0.5)
    },
}));

const ToolBar = props => {
  const { className, ...rest } = props;

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
          <Typography color="textPrimary">Điều khoản</Typography>
        </Breadcrumbs>
      </div>
      <div>
        <Typography variant="h3" gutterBottom>
          Quyền hạn & điều khoản sử dụng
        </Typography>
      </div>
    </div>
  );
};

ToolBar.propTypes = {
  className: PropTypes.string,
};


export default ToolBar;
