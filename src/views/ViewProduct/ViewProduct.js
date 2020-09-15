import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ContentViewProduct, ToolBarViewProduct } from './components';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));

const ViewProduct = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ToolBarViewProduct />
            <div className={classes.content}>
                <ContentViewProduct />
            </div>
        </div>
    );
};

ViewProduct.propTypes = {
    
};

export default ViewProduct;