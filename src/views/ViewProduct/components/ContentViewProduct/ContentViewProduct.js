import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider  } from '@material-ui/core/styles';
import { 
    Card, 
    CardContent,
    Grid,
    CardHeader,
    Divider
    
 } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {},
}));

const buttonAddPhoto = createMuiTheme({
    palette: {
        primary : {
            contrastText: '#fff',
            main: '#9c27b0'
        },
    },
  });

const buttonStore = createMuiTheme({
    palette: {
        primary : {
            contrastText: '#fff',
            main: '#5850EC'
        },
    },
  });

const ContentViewProduct = props => {

    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <React.Fragment>
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
            </Card>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    
                    <Card
                        {...rest}
                        className={clsx(classes.root, className)}
                    >
                        <CardHeader title="Giới thiệu bài viết" />
                        <Divider/>
                        <CardContent>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card
                        {...rest}
                        className={clsx(classes.root, className)}
                    >
                        <CardHeader title="Slide Bar" />
                        <Divider/>
                        <CardContent>

                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid item xs={12}>
                    <br/>
                    <Card
                        {...rest}
                    >
                        <CardHeader title="Viết nội dung" />
                        <Divider/>
                        <CardContent>
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

ContentViewProduct.propTypes = {
    
    
};


export default ContentViewProduct;