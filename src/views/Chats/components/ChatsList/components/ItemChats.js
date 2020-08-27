import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {  
    Typography,
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemText,

 } from '@material-ui/core';
 const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: 'inset 4px 0px 0px #5850EC',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    }
    }));

const ItemChats = props => {

    const classes = useStyles();
    
    return (
        <ListItem
            button
            gutters
            className={ clsx(classes.root) }
        >
            <ListItemAvatar>
                <Avatar
                    className={classes.avatar}
                    src={'/images/avatars/avatar_1.png'}
                />
            </ListItemAvatar>
            <ListItemText 
                primary={ <Typography component="h5" variant="h6"> Nguyễn Văn Danh</Typography>} 
                secondary={ 
                <React.Fragment>
                    <Typography component="h5" variant="body2">Cám ơn bạn ))</Typography>
                    <Typography component="h5" variant="body2">2 giờ trước</Typography>
                </React.Fragment>
            }
            />
        </ListItem>
    );
};

ItemChats.propTypes = {
    
};

export default ItemChats;