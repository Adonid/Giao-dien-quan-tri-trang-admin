import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ProductsToolbar } from './components';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));

const AddNewProduct = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ProductsToolbar />
            <div className={classes.content}>
                {/* <ProductCard /> */}
            </div>
        </div>
    );
};

AddNewProduct.propTypes = {
    
};

export default AddNewProduct;