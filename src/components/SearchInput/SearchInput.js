import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, TextField  } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexBasis: 420
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  },
  colorSeach: {
    color: '#546e7a'
  }
}));

const SearchInput = props => {
  const { className, search, style, ...rest } = props;

  const classes = useStyles();

  const handleSearch = val => search(val.target.value);

  return (
    <Paper
      {...rest}
      className={clsx(classes.root, className)}
      style={style}
    >
      {/* <SearchIcon className={classes.icon} /> */}
      <TextField 
          {...rest}
          className={classes.input}
          disableunderline="true"
          onChange={ handleSearch }
          id="outlined-helperText"
          placeholder="Tìm kiếm"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className={classes.colorSeach} />
              </InputAdornment>
            ),
          }}
          type="search"
        />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  search: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
