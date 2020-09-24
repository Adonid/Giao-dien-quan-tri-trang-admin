import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardContent,
    Grid,
    TextField,
    FormControl,
    CardHeader,
    Divider,
    CardActions, 
    IconButton, InputLabel, InputAdornment, Input, Box, Chip
    
 } from '@material-ui/core';
 import ViewQuiltOutlinedIcon from '@material-ui/icons/ViewQuiltOutlined';
import { InputNotBorder } from 'components';

const useStyles = makeStyles(theme => ({
    root: {},
    padding: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    contentCategorys: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
      },
    chip: {
        margin: theme.spacing(0.5),
      },
}));

const chipsCategory = [
    { id: 1, label: 'Angular', qtyProducts: 12 },
    { id: 2, label: 'jQuery', qtyProducts: 34 },
    { id: 3, label: 'Polymer', qtyProducts: 77 },
    { id: 4, label: 'React', qtyProducts: 72 },
    { id: 5, label: 'Vue.js', qtyProducts: 90 },
  ];

const ContentNewProduct = props => {

    const { className, ...rest } = props;

    const classes = useStyles();

    const [chipsCat, setChipsCat] = React.useState(chipsCategory);
    
      const handleDelete = (chipToDelete) => () => {
        setChipsCat( (chipsCat) => chipsCat.filter( chip => chip.id !== Number(chipToDelete)) );
      };

    const handleAddCategory = event => {

    }

    return (
        <React.Fragment>
            <form onSubmit={ handleAddCategory } >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card
                            {...rest}
                            className={clsx(classes.root, className)}
                        >
                            <CardActions disableSpacing className={classes.padding}>
                                <FormControl fullWidth >
                                    <InputNotBorder placeholder="Thêm danh mục" icon={ <ViewQuiltOutlinedIcon /> } fullWidth />
                                </FormControl>
                            </CardActions>
                            <Divider/>
                            <CardContent className={classes.padding}>
                                <Box component="ul" className={classes.contentCategorys}>
                                    {chipsCat.map( chip => (
                                        <li key={ chip.key }>
                                            <Chip
                                                disabled={ chip.id===1 ? true : false }
                                                label={chip.label + ` (${chip.qtyProducts})`}
                                                onDelete={ chip.id===1 ? undefined : handleDelete( chip.id ) }
                                                className={classes.chip}
                                            />
                                        </li>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

ContentNewProduct.propTypes = {
    
};

export default ContentNewProduct;