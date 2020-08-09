import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Button, 
  Typography,
  Breadcrumbs,
  Link
 } from '@material-ui/core';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
          <Link color="inherit" component="button">
            Material-UI
          </Link>
          <Link color="inherit" component="button">
            Core
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
        <Button
          color="primary"
          variant="contained"
          onClick={ showModalAddUser }
        >
          <AddCircleOutlineIcon/> Add user
        </Button>
      </div>
      <div>
        <Typography variant="h3" gutterBottom>
          Quản lý người dùng
        </Typography>
      </div>
      <div className={classes.groupButton}>
        <Button><CloudUploadOutlinedIcon/> Import</Button>
        <Button><CloudDownloadOutlinedIcon/> Export</Button>
      </div>
      
    </div>
  );
};

UsersToolbar.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersToolbar)
