import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  flexRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titlePage: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.8),
    textTransform: "uppercase",
    color: "#546e7a"
  }
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const ProductsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.flexRow}>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Dashboad
            </Link>
            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
              Du lịch
            </Link>
            <Typography color="textPrimary">Breadcrumb</Typography>
          </Breadcrumbs>
          <Typography variant="h4" className={classes.titlePage}>
            Đến Hà Thành đừng quên ghé thăm 3 địa điểm du lịch cổ xưa này
          </Typography>
        </div>
        <div>
          <span className={classes.spacer} />
          <Button className={classes.importButton}>Import</Button>
          <Button className={classes.exportButton}>Export</Button>
          <Button
            color="primary"
            variant="contained"
          >
            Add product
          </Button>
        </div>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
        />
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
