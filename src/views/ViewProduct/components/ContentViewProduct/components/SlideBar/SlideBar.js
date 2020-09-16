import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles  } from '@material-ui/core/styles';
import { 
    Card, 
    CardContent,
    Grid,
    CardHeader,
    Divider, 
    Box, 
    CardMedia, 
    Typography, 
    Avatar, Paper
    
 } from '@material-ui/core';
 import PerfectScrollbar from 'react-perfect-scrollbar';
 import { getInitials } from 'helpers';
 import { red } from '@material-ui/core/colors';


 const useStyles = makeStyles(theme => ({
    root: {},
    postRelative: {
        marginBottom: theme.spacing(4),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
    avatar: {
        backgroundColor: red[500],
    },
    maxHeightPerfectScrollbar: {
        maxHeight: theme.spacing(90.75)
      },
 }));

const SlideBar = props => {

    const classes = useStyles();

    const { className, ...rest } = props;

    return (
        <Grid item xs={12} sm={4}>
            <Card
                {...rest}
            >
                <CardHeader title={ `Bài viết liên quan (3)` } />
                <Divider/>
                <CardContent>
                    <PerfectScrollbar className={ classes.maxHeightPerfectScrollbar }>
                        <Box className={ classes.postRelative }>
                            <Paper elevation={3}>
                                <Card className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                aria-label="author" 
                                                className={ classes.avatar }
                                                src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/card-profile1-square.3122abf4.jpg' }
                                            >
                                                {getInitials('Lê Dũng' )}
                                            </Avatar>
                                        }
                                        title={ <Typography variant="h6">Shrimp and Chorizo Paella</Typography>}
                                        subheader={ <Typography variant="caption">Công nghệ - September 14, 2020</Typography>}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image="https://images.unsplash.com/photo-1576097383839-4bedeef62543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="h5">
                                            How We Built the Most Successful Castle Ever
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Box>
                        <Box className={ classes.postRelative }>
                            <Paper elevation={3}>
                                <Card className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                aria-label="author" 
                                                className={ classes.avatar }
                                                src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/card-profile6-square.1f1f4900.jpg' }
                                            >
                                                {getInitials('Lê Dũng' )}
                                            </Avatar>
                                        }
                                        title={ <Typography variant="h6">Shrimp and Chorizo Paella</Typography>}
                                        subheader={ <Typography variant="caption">Công nghệ - Octember 16, 2020</Typography>}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image="https://images.unsplash.com/photo-1561173477-f4a5fe106b32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="h5">
                                            How We Built the Most Successful Castle Ever
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Box>
                        <Box className={ classes.postRelative }>
                            <Paper elevation={3}>
                                <Card className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                aria-label="author" 
                                                className={ classes.avatar }
                                                src={ '' }
                                            >
                                                {getInitials('Hle Lin' )}
                                            </Avatar>
                                        }
                                        title={ <Typography variant="h6">Shrimp and Chorizo Paella</Typography>}
                                        subheader={ <Typography variant="caption">Công nghệ - December 2, 2020</Typography>}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image="https://images.unsplash.com/photo-1598218674125-61de0837f8ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="h5">
                                            How We Built the Most Successful Castle Ever
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Box>
                    </PerfectScrollbar>
                </CardContent>
            </Card>
        </Grid>
    );
};

SlideBar.propTypes = {
    
};

export default SlideBar;