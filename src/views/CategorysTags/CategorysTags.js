import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ToolBar, Categorys, Tags } from './components';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));

const CategorysTags = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ToolBar />
            <div className={classes.content}>
                <Categorys />

                <Tags />
            </div>
        </div>
    );
};

CategorysTags.propTypes = {
    
};

export default CategorysTags;