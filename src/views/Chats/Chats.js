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

    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Grid container className={classes.root} spacing={2}>
                <Grid item>

                </Grid>
            </Grid>
        </div>
    );
};

Chats.propTypes = {
    
};

export default Chats;