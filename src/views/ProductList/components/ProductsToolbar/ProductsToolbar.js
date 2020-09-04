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
 import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
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

const ProductsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const showModalAddUser = () => {
    props.showModalAddNewUser();
}

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
          <Typography color="textPrimary">Quản lý bài viết</Typography>
        </Breadcrumbs>
        <Button
          color="primary"
          variant="contained"
          onClick={ showModalAddUser }
        >
          <PostAddOutlinedIcon/> Thêm mới
        </Button>
      </div>
      <div>
        <Typography variant="h3" gutterBottom>
          Quản lý bài viết
        </Typography>
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

  const mapStateToProps = (state, ownProps) => {
    return {
      prop: state.prop
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      showModalAddNewUser: () => {
        dispatch({
          type: 'SHOW_MODAL_ADD_USER'
        })
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductsToolbar)
