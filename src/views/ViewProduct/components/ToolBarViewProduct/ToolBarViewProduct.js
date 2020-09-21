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
 import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
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

const ToolBarViewProduct = props => {

  const { className, namePost, ...rest } = props;

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
          <Typography color="textPrimary"> { namePost } </Typography>
        </Breadcrumbs>
        <Link color="inherit" underline="none" component={RouterLink} to="/products">
          <Button
            color="primary"
            variant="contained"
          >
            <BorderColorOutlinedIcon/> Sửa bài
          </Button>
        </Link>
      </div>
      <div>
        <Typography variant="h3" gutterBottom>
           { namePost } 
        </Typography>
      </div>
    </div>
  );
};

ToolBarViewProduct.propTypes = {
  className: PropTypes.string,
  namePost: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    namePost: state.dataPostDetail.postInfo.title,
  }
}

export default connect(mapStateToProps)(ToolBarViewProduct)
