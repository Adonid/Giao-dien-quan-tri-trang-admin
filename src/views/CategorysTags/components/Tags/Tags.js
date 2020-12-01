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
    Tooltip,
    CircularProgress
 } from '@material-ui/core';
 import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
 import { InputNotBorder } from 'components';
import dayjs from 'dayjs';
import { CreateTag, DeleteTag } from 'redux/actions';

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

    const { 
        className, 
        loadingCreate,
        loadingDel,
        tags, 
        createTag, 
        deleteTag, 
        ...rest 
    } = props;

    const classes = useStyles();
    
      const handleDelete = id => () => {
        deleteTag(id );
      };

    const handleCreateTag = name => {
        createTag( {name, time: dayjs().format("MM/DD/YYYY | hh:mm A")} );
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
                                <InputNotBorder callBack={ handleCreateTag } placeholder="Thêm thẻ tag sản phẩm/bài viết" icon={ loadingCreate ? <CircularProgress size={15} /> : <LocalOfferOutlinedIcon /> } fullWidth />
                            </FormControl>
                        </CardActions>
                        <Divider/>
                        <CardContent className={classes.padding}>
                            <Box component="ul" className={classes.contentTags}>
                                { 
                                    tags.map( chip => (
                                        <li key={ chip.key }>
                                            <Tooltip 
                                                placement="bottom" 
                                                title={ Object.keys(chip.postsList).length ? Object.values(chip.postsList).map( tag => <React.Fragment><span>{ tag.name }</span> <br/></React.Fragment>) : <React.Fragment><span>Chưa gắn bài viết</span> <br/></React.Fragment> }
                                            >
                                                <Chip
                                                    label={chip.name + ` (${Object.keys(chip.postsList).length})`}
                                                    onDelete={ chip.id==="default" ? undefined : handleDelete( chip.id ) }
                                                    className={classes.chip}
                                                    disabled={loadingDel}
                                                />
                                            </Tooltip>
                                        </li>
                                    ))
                                }
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
    loadingCreate: PropTypes.bool.isRequired,
    loadingDel: PropTypes.bool.isRequired,

    createTag: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loadingCreate: state.dataCategoryTag.loadingCreateTag,
    loadingDel: state.dataCategoryTag.loadingDelTag,
});

const mapDispatchToProps = dispatch => ({

    createTag: dataTag => dispatch( CreateTag(dataTag) ),

    deleteTag: id => dispatch( DeleteTag(id) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tags)