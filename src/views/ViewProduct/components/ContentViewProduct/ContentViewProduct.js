import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, makeStyles  } from '@material-ui/core/styles';
import { 
    Card, 
    Grid,
    
 } from '@material-ui/core';
import { CommentProduct, FixedContent, SlideBar } from './components';

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

            <Grid container spacing={3}>
                <FixedContent/>
            </Grid>

            <Grid container spacing={3}>
                
                <CommentProduct/>

                <SlideBar/>
                
            </Grid>
        </React.Fragment>
    );
};

ContentViewProduct.propTypes = {
    
    
};


export default ContentViewProduct;