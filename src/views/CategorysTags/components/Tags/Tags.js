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
    
 } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {},
}));


const Tags = props => {

    const { className, createPost, isLoading, categorys, tags, ...rest } = props;

    const classes = useStyles();

    const handleAddTags = event => {

    }

    return (
        <React.Fragment>
            <form onSubmit={ handleAddTags } >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        
                        <Card
                            {...rest}
                            className={clsx(classes.root, className)}
                        >
                            <CardHeader title="Giới thiệu bài viết" />
                            <Divider/>
                            <CardContent>
                                <FormControl fullWidth margin="dense">
                                    <TextField 
                                        id="name-post"
                                        name="name"
                                        label="Tên bài viết" 
                                        type="search" 
                                    />
                                </FormControl>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};

Tags.propTypes = {
    
};

export default Tags;