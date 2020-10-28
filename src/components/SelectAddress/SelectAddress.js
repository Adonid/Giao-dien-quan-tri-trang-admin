import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    MenuItem
  } from '@material-ui/core';

const SelectAddress = props => {

    const { label, list, valSelect, action, disable, margin, fullWidth, required } = props;

    const [ itemSelect, setItemSlect ] = useState(valSelect??"");

    const handleChange = event => {
      event.persist();
      const val = event.target.value;
      setItemSlect(val);
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
            value={ itemSelect }
            onChange={handleChange}
            // helperText="Thứ tự sắp xếp"
            variant="outlined"
            disabled={ disable??false}
        >
            {
              list.sort((a, b) => parseInt(Number(a.code)) - parseInt(Number(b.code))).map( option => (
                <MenuItem key={option.code} value={option.code}>
                  {option.name_with_type}
                </MenuItem>
              ))
            }
        </TextField>
    );
};

SelectAddress.propTypes = {
    list : PropTypes.array,
    valSelect : PropTypes.string,
    action: PropTypes.func,
    label: PropTypes.string,
    disable: PropTypes.bool,
    margin: PropTypes.string,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool
};

export default SelectAddress;