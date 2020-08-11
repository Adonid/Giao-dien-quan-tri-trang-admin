import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
    Breadcrumbs, 
    Link, 
    Typography 
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
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

const UserDetail = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.row}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" gutterBottom>
            <Link color="inherit" component="button">
                Dashboard
            </Link>
            <Typography color="textPrimary">Quản lý người dùng</Typography>
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
      </div>
      <div className={classes.content}>
        
      </div>
    </div>
  );
};

export default UserDetail;
