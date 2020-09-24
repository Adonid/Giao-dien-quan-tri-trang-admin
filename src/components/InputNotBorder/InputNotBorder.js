import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import { 
    InputAdornment,
    TextField
} from '@material-ui/core';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'transparent',
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before' : {
        borderBottom: 'none'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gray: {
    color: '#546e7a'
  }
}));

const InputNotBorder = props => {

    const { placeholder, icon, ...rest } = props;

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate>
      <CssTextField 
        placeholder="Thêm danh mục"
        InputProps={
            {
                startAdornment: (
                  <InputAdornment position="start" className={ classes.gray }>
                    { icon }
                  </InputAdornment>
                ),
            }
        }
        { ...rest }
      />
    </form>
  );
}

InputNotBorder.propTypes = {
    placeholder: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
}

export default InputNotBorder;
