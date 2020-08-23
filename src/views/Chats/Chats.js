import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
    Grid 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexGrow: 1,
    }
  }));

const Chats = props => {

