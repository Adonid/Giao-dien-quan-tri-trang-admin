import React from 'react';
import PropTypes from 'prop-types';
import {
    Link as RouterLink
  } from "react-router-dom";
  import moment from 'moment';
  import { makeStyles, ThemeProvider } from '@material-ui/styles';
  import { 
      Breadcrumbs, 
      Link, 
      Typography, 
      Button,
      Grid,
      Card,
      CardHeader,
      Divider,
      Table,
      TableBody,
      TableRow,
      TableCell,
      Box,
      CardContent,
      createMuiTheme,
      TextField
  } from '@material-ui/core';
  import PerfectScrollbar from 'react-perfect-scrollbar';
  import EditAttributesOutlinedIcon from '@material-ui/icons/EditAttributesOutlined';
  import NavigateNextIcon from '@material-ui/icons/NavigateNext';
  import NotInterestedIcon from '@material-ui/icons/NotInterested';
  import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
  import MailOutlineIcon from '@material-ui/icons/MailOutline';
  import LockOpenIcon from '@material-ui/icons/LockOpen';
  import { SelectInput } from 'components';
  import { ConfirmDialog } from 'alerts';
  
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(5)
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
    },
    textHighLightVerify: {
      color: '#4caf50',
      backgroundColor: '#4caf5014',
      fontWeight: 500,
      fontSize: 11,
      padding: '4px 8px',
      borderRadius: 3,
    },
    textHighLightNoVerify:{
      color: '#ffab40',
      backgroundColor: '#ffefc2',
      fontWeight: 500,
      fontSize: 11,
      padding: '4px 8px',
      borderRadius: 3,
    },
    textHighLightInfo: {
      color: '#29b6f6',
      backgroundColor: '#e6f8fb',
      fontWeight: 500,
      fontSize: 11,
      padding: '4px 8px',
      borderRadius: 3,
    },
    buttonDelete: {
      color: '#fff',
      backgroundColor: '#f44336',
    },
    textWarning: {
      paddingBottom: theme.spacing(1),
      '& >p' : {
        color: '#546e7ad9'
      }
    },
    contentSend: {
      '& .MuiBox-root': {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      }
    },
    maxHeightPerfectScrollbar: {
      maxHeight: 123
    },
    isHidenField: {
      display: 'none'
    }
  }));

const UserEditor = props => {
    return (
        <div className={ classes.root}>
            <div>
                <div className={classes.row}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" gutterBottom>
                        <Link color="inherit" component={RouterLink} to="/dashboard">
                            Dashboard
                        </Link>
                        <Link color="inherit" component={RouterLink} to="/users">
                        Quản lý người dùng
                        </Link>
                        <Typography color="textPrimary">{ props.userinfo.name }</Typography>
                    </Breadcrumbs>
                    <Button
                    color="primary"
                    variant="contained"
                    // onClick={ showModalAddUser }
                    >
                        <EditAttributesOutlinedIcon/> Edit User
                    </Button>
                </div>
                <div>
                    <Typography variant="h3" gutterBottom>
                    { props.userinfo.name }
                    </Typography>
                </div>
            </div>

            <div className={classes.content}>
                <Box>
                    <Grid container maxWidthLg spacing={5}>
                        <form>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid
                                            xs={12} 
                                            sm={6}
                                        >
                                            <TextField id="name-user" label="Tên người dùng *" variant="outlined" />
                                            <TextField id="email-user" label="Email *" variant="outlined" />
                                            <TextField id="phone-user" label="Số điện thoại *" variant="outlined" />
                                        </Grid>
                                        <Grid
                                            xs={12} 
                                            sm={6}
                                        >

                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </form>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

UserEditor.propTypes = {
    
};

export default UserEditor;