import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ToolBar, Content } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Term = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ToolBar />
      <div className={classes.content}>
        <Content />
      </div>
    </div>
  );
};

export default Term;
