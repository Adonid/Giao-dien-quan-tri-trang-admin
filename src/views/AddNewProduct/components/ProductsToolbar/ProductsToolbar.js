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
 import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
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

const ProductsToolbar = props => {
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
          <Link color="inherit" component={RouterLink} to="/products">
              Quản lý bài viết
          </Link>
          <Typography color="textPrimary">Thêm mới bài viết</Typography>
        </Breadcrumbs>
        <Link color="inherit" component={RouterLink} to="/products">
          <Button
            color="primary"
            variant="contained"
          >
            <BallotOutlinedIcon/> Danh sách
          </Button>
        </Link>
      </div>
      <div>
        <Typography variant="h3" gutterBottom>
          Viết bài mới
        </Typography>
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
