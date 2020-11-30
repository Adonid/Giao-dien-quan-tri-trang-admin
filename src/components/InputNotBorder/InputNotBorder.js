import React, { useState } from 'react';
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

    const { callBack, placeholder, icon, ...rest } = props;

    const [ string, setString ] = useState('');

  const classes = useStyles();

    const handleChange = event => setString(event.target.value);

    const handleSubmit = event => {
      event.preventDefault();
      if(string){
        callBack(string);
        setString('');
      }
    }

  return (
    <form className={classes.root} noValidate onSubmit={ handleSubmit }>
      <CssTextField 
        placeholder={ placeholder }
        InputProps={
            {
                startAdornment: (
                  <InputAdornment position="start" className={ classes.gray }>
                    { icon }
                  </InputAdornment>
                ),
            }
        }
        onChange= { handleChange }
        value={ string }
        { ...rest }
      />
    </form>
  );
}

InputNotBorder.propTypes = {
    placeholder: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    callBack: PropTypes.func.isRequired,
}

export default InputNotBorder;
