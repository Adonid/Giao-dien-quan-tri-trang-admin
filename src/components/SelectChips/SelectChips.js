import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import { 
    FormControl,
    InputLabel,
    Select,
    Chip,
    Input,
    MenuItem,
    
 } from '@material-ui/core';

 const useStyles = makeStyles(theme => ({
    root: {},
    formControl: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiChip-root': {
            margin: 2
        }
    }
}));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getStyles = (name, personName, theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const SelectChips = props => {

    const { fullWidth, list, ...rest } = props;

    const classes = useStyles();

    const theme = useTheme();

    const [personName, setPersonName] = useState([]);

    const handleChangeTags = (event) => {
        setPersonName(event.target.value);
      };

    return (
        <FormControl className={classes.formControl} fullWidth={ fullWidth??false }>
            <InputLabel id="mutiple-chip-label">Gắn thẻ bài viết</InputLabel>
            <Select
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={ personName }
                onChange={ handleChangeTags }
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {list.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

SelectChips.propTypes = {
    fullWidth : PropTypes.bool,
    list : PropTypes.array,
};

export default SelectChips;