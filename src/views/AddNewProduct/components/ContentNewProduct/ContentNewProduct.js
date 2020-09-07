import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
    Card, 
    CardContent
    
 } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    
}));

const ContentNewProduct = props => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardContent className={classes.content}>

                </CardContent>
            </Card>
        </React.Fragment>
    );
};

ContentNewProduct.propTypes = {
    
};

export default ContentNewProduct;