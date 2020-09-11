import React from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    MenuItem
  } from '@material-ui/core';

const SelectInput = props => {

    const { label, list, action, disable, margin, fullWidth, required, ...rest } = props;

    const [ item, setItem ] = React.useState(list[0].value);

    const handleChange = event => {
      event.persist();
      const val = event.target.value;
      setItem(val);
      action(val);
    }

    return (
        <TextField
            required={ required??false }
            fullWidth={fullWidth??false}
            id="outlined-select-item"
            select
            margin={ margin??"none" }
            label={label??"Sắp xếp"}
            value={item}
            onChange={handleChange}
            // helperText="Thứ tự sắp xếp"
            variant="outlined"
            disabled={ disable??false}
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
    action: PropTypes.func,
    label: PropTypes.string,
    disable: PropTypes.bool,
    margin: PropTypes.bool,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool
};

export default SelectInput;