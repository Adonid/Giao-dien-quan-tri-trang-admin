import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {  
    Typography,
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Badge,

 } from '@material-ui/core';
 const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: 'inset 4px 0px 0px #5850EC',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    }
    }));

const ItemChats = props => {

    const { dataItem, viewConversation, ...rest } = props;

    const classes = useStyles();

    const handleViewConversation = () => viewConversation(dataItem.id);
    
    return (
        <ListItem
            button
            gutters
            className={ clsx(dataItem.isSelected&&classes.root) }
            onClick={ handleViewConversation }
        >
            <ListItemAvatar>
                <Badge
                    variant={ dataItem.isReaded ? "default" : "dot" }
                    color="secondary"
                >
                    <Avatar
                        className={classes.avatar}
                        src={ dataItem.avatar }
                    />
                </Badge>
                
            </ListItemAvatar>
            <ListItemText 
                primary={ <Typography component="h5" variant="h6">{ dataItem.name }</Typography>} 
                secondary={ 
                <React.Fragment>
                    <Typography component="h5" variant="body2"> { dataItem.content } </Typography>
                    <Typography component="h5" variant="body2" color={ dataItem.isReaded ? "default" : "secondary" } > { dataItem.time } </Typography>
                </React.Fragment>
            }
            />
        </ListItem>
    );
};

ItemChats.propTypes = {
    dataItem: PropTypes.object.isRequired,
    viewConversation: PropTypes.func.isRequired,
};

export default ItemChats;