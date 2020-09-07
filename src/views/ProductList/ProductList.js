import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { ProductsToolbar, ProductCard } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ProductList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProductsToolbar />
      <div className={classes.content}>
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductList;
