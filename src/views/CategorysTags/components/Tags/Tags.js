import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
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
    Tooltip
    
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

const Tags = props => {

    const { className, tags, addTag, deleteTag, ...rest } = props;

    const classes = useStyles();
    
      const handleDelete = (chipToDelete) => () => {
        // deleteTag( Number(chipToDelete) );
      };

    const handleAddTag = tag => {
        // addTag( tag );
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
                                { tags.map( chip => (
                                    <li key={ chip.key }>
                                        <Tooltip 
                                            placement="bottom" 
                                            title={ Object.keys(chip.tagsList).length ? Object.values(chip.tagsList).map( tag => <React.Fragment><span>{ tag.name }</span> <br/></React.Fragment>) : <React.Fragment><span>Chưa gắn bài viết</span> <br/></React.Fragment> }
                                        >
                                            <Chip
                                                label={chip.name + ` (${Object.keys(chip.tagsList).length})`}
                                                onDelete={ handleDelete( chip.id ) }
                                                className={classes.chip}
                                            />
                                        </Tooltip>
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
    tags: PropTypes.array.isRequired,

    addTag: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    // tags: state.dataCategoryTag.tags
});

const mapDispatchToProps = dispatch => ({
    addTag: name => {
        dispatch({
            type: "ADD_TAG",
            newTag: name
        })
    },
    deleteTag: id => {
        dispatch({
            type: "DELETE_TAG",
            delTag: id
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Tags)