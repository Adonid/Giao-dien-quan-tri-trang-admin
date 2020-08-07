import React from 'react';
import PropTypes from 'prop-types';
import {
    TextField,
    MenuItem
  } from '@material-ui/core';

  const currencies = [
    {
      value: '1',
      label: 'Theo tên A-Z',
    },
    {
      value: '2',
      label: 'Theo tên Z-A',
    },
    {
      value: '3',
      label: 'Theo ngày đăng ký mới nhất',
    },
    {
      value: '4',
      label: 'Theo ngày đăng ký cũ nhất',
    },
  ];

const SelectInput = props => {

    const [currency, setCurrency] = React.useState('1');
    
    return (
        <TextField
            id="outlined-select-currency"
            select
            label="Sắp xếp"
            value={currency}
            // onChange={handleChange}
            helperText="Sắp xếp theo thứ tự"
            variant="outlined"
        >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
    );
};

SelectInput.propTypes = {
    
};

export default SelectInput;