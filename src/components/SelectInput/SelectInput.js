import React from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    MenuItem
  } from '@material-ui/core';

const SelectInput = props => {

    const { list, action, ...rest } = props;

    const [ item, setItem ] = React.useState(list[0].value);

    const handleChange = event => {
      const val = event.target.value;
      setItem(val);
      action(val);
    }

    return (
        <TextField
            id="outlined-select-item"
            select
            label="Sắp xếp"
            value={item}
            onChange={handleChange}
            // helperText="Thứ tự sắp xếp"
            variant="outlined"
        >
            {
              list.map( option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            }
        </TextField>
    );
};

SelectInput.propTypes = {
    list : PropTypes.array,
    action: PropTypes.func
};

export default SelectInput;