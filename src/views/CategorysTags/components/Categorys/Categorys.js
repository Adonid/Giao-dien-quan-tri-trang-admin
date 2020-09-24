import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardContent,
    Grid,
    FormControl,
    Divider,
    CardActions, 
    Box, 
    Chip, 
    Avatar
    
 } from '@material-ui/core';
 import ViewQuiltOutlinedIcon from '@material-ui/icons/ViewQuiltOutlined';
import { InputNotBorder } from 'components';
import { getInitials } from 'helpers';

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
      avatar: {
          
      }
}));

const chipsCategory = [
    { id: 1, label: 'Angular', qtyProducts: 12, avatar: "https://images.unsplash.com/photo-1600800609386-11ab3105a9e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
    { id: 2, label: 'jQuery', qtyProducts: 34, avatar: "https://images.unsplash.com/photo-1556691432-33035a3466fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
    { id: 3, label: 'Polymer', qtyProducts: 77, avatar: "https://images.unsplash.com/photo-1597690310639-272d222023b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
    { id: 4, label: 'React', qtyProducts: 72, avatar: "https://images.unsplash.com/photo-1551835503-ffa9edbacc75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
    { id: 5, label: 'Vue.js', qtyProducts: 90, avatar: "https://images.unsplash.com/photo-1517137660927-27542f89984d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
  ];

const Categorys = props => {

    const { className, ...rest } = props;

    const classes = useStyles();

    const [chipsCat, setChipsCat] = useState(chipsCategory);
    
      const handleDelete = chipToDelete => () => {
        setChipsCat( (chipsCat) => chipsCat.filter( chip => chip.id !== Number(chipToDelete)) );
      };

    const handleAddCategory = category => {
        setChipsCat ( chipsCat => [ ...chipsCat, { id: Math.floor(Math.random() * (99999 - 99)) + 99, label: category, qtyProducts: 0 } ])
    }
    
    const handleClick = chip => {
        console.info(chip);
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card
                        {...rest}
                        className={clsx(classes.root, className)}
                    >
                        <CardActions disableSpacing className={classes.padding}>
                            <FormControl fullWidth >
                                <InputNotBorder callBack={ handleAddCategory } placeholder="Thêm danh mục" icon={ <ViewQuiltOutlinedIcon /> } fullWidth autoFocus />
                            </FormControl>
                        </CardActions>
                        <Divider/>
                        <CardContent className={classes.padding}>
                            <Box component="ul" className={classes.contentCategorys}>
                                {chipsCat.map( chip => (
                                    <li key={ chip.key }>
                                        <Chip
                                            label={chip.label + ` (${chip.qtyProducts})`}
                                            onDelete={ chip.id===1 ? undefined : handleDelete( chip.id ) }
                                            className={classes.chip}
                                            onClick={ event => handleClick(chip.id) }
                                            avatar={
                                                <Avatar
                                                className={classes.avatar}
                                                src={ chip.avatar }
                                                >
                                                {getInitials( chip.label )}
                                                </Avatar>
                                            }
                                        />
                                    </li>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Categorys.propTypes = {
    
};

export default Categorys;