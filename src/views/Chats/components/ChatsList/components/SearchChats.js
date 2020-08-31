import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {  
    InputBase,
    Box,
 } from '@material-ui/core';
 import SearchIcon from '@material-ui/icons/Search';

 const useStyles = makeStyles(theme => ({
    root: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    search: {
      height: theme.spacing(5.5),
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(2),
      borderRadius: theme.spacing(2.8),
      paddingRight: theme.spacing(2),
      backgroundColor: '#f4f6f8',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#607d8bd6'
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '25ch',
        '&:focus': {
          width: '33ch',
        },
      },
      [theme.breakpoints.down('md')]: {
        width: '15ch',
        '&:focus': {
          width: '20ch',
        },
      },
    }
    }));

const SearchChats = props => {

    const { search, ...rest } = props;

    const classes = useStyles();

    const handleSearch = val => search(val.target.value);

    return (
        <Box className={ classes.root}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="Tìm…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                type="search"
                onChange={ handleSearch }
                />
            </div>
        </Box>
    );
};

SearchChats.propTypes = {
  search: PropTypes.func.isRequired
};

export default SearchChats;