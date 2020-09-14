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

  const getStyles = (name, valueChip, theme) => {
    return {
      fontWeight:
        valueChip.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const SelectChips = props => {

    const { fullWidth, list, ...rest } = props;

    const classes = useStyles();

    const theme = useTheme();

    const [valueChip, setValueChip] = useState([]);

    const handleChangeTags = (event) => {
        console.log(event.target.value);
        setValueChip(event.target.value);
      };

    return (
        <FormControl className={classes.formControl} fullWidth={ fullWidth??false }>
            <InputLabel id="mutiple-chip-label">Gắn thẻ bài viết</InputLabel>
            <Select
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={ valueChip }
                onChange={ handleChangeTags }
                input={<Input id="select-multiple-chip" />}
                renderValue={ itemSelected => (
                    <div className={classes.chips}>
                        {itemSelected.map( item => (
                            <Chip key={ item.label } label={ item.label } className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {list.map( item => (
                    <MenuItem key={item.id} value={item} style={getStyles(item.label, valueChip, theme)}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

SelectChips.propTypes = {
    fullWidth : PropTypes.bool,
    list : PropTypes.array.isRequired,
};

export default SelectChips;