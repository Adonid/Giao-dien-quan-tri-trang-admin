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
    Chip
    
 } from '@material-ui/core';
 import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
 import { InputNotBorder } from 'components';

const useStyles = makeStyles(theme => ({
    root: {},
    padding: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    contentTags: {
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

const chipsTags = [
    { id: 1, label: 'PYTHON', qtyProducts: 12 },
    { id: 2, label: 'CSS', qtyProducts: 34 },
    { id: 3, label: 'HTML', qtyProducts: 77 },
    { id: 4, label: 'JAVASCRIPT', qtyProducts: 72 },
    { id: 5, label: 'C#', qtyProducts: 90 },
  ];

const Tags = props => {

    const { className, ...rest } = props;

    const classes = useStyles();

    const [chipsTag, setChipsTag] = useState(chipsTags);
    
      const handleDelete = (chipToDelete) => () => {
        setChipsTag( (chipsTag) => chipsTag.filter( chip => chip.id !== Number(chipToDelete)) );
      };

    const handleAddTag = tag => {
        setChipsTag ( chipsTag => [ ...chipsTag, { id: Math.floor(Math.random() * (99999 - 99)) + 99, label: tag, qtyProducts: 0 } ])
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
                                <InputNotBorder callBack={ handleAddTag } placeholder="Thêm thẻ tag sản phẩm/bài viết" icon={ <LocalOfferOutlinedIcon /> } fullWidth />
                            </FormControl>
                        </CardActions>
                        <Divider/>
                        <CardContent className={classes.padding}>
                            <Box component="ul" className={classes.contentTags}>
                                {chipsTag.map( chip => (
                                    <li key={ chip.key }>
                                        <Chip
                                            label={chip.label + ` (${chip.qtyProducts})`}
                                            onDelete={ handleDelete( chip.id ) }
                                            className={classes.chip}
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

Tags.propTypes = {
    
};

export default Tags;