import React, { useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
    List, 
    ListItem,
    Divider,
    ListItemText ,
    ListItemAvatar ,
    Avatar,
    Typography,
    Link,
    ListSubheader
  } from '@material-ui/core';

import mockData from './data';

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    content: {
      display: 'inline',
      marginBottom: theme.spacing(0),
    },
    time: {
        display: 'block',
        paddingTop: theme.spacing(0.25),
        color: '#aaa'
    },
    footerList: {
        padding: theme.spacing(0),
        backgroundColor: "#f4f6f8",
        display: "flex",
        direction: "row",
        justify: "space-between"
    },
    marginNone: {
        margin: 0
    }
  }));

  const handleNotify = (event) => {
    console.log(1);
  }
  
const ListBar = props => {
    const {className, ...rest} = props;

    const classes = useStyles();

    const [notifys] = useState(mockData);
    return (
        <Fragment>
            {
                notifys.map( cluster => (
                    <List key={cluster.ref} subheader={<ListSubheader> {cluster.type} </ListSubheader>} className={classes.root}>
                        {
                            cluster.items.map( item => (
                                <Fragment key={ item.id }>
                                    <ListItem button alignItems="flex-start" onClick={(event) => handleNotify(event)}>
                                        <ListItemAvatar>
                                            <Avatar alt={ item.name } src={ item.avatar } />
                                        </ListItemAvatar>
                                        <ListItemText
                                            className={classes.marginNone}
                                            primary={ item.name }
                                            secondary={
                                                <Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.content}
                                                    color="textPrimary"
                                                >
                                                    { item.topic }
                                                </Typography>
                                                {"— " + item.content}
                                                <Typography className={classes.time} variant="caption" color="initial" gutterTop>
                                                    { item.time }
                                                </Typography>
                                                </Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </Fragment>
                            ))
                        }
                    </List>
                ))
            }   
            <Divider />
            <List className={classes.footerList}>
              <ListItem>
                <Link component="button" color="inherit" underline="none">
                    <Typography variant="caption">Xóa tất cả</Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link component="button" color="inherit" underline="none">
                    <Typography variant="caption">Đã đọc tất cả</Typography>
                </Link>
              </ListItem>
            </List>
            <Divider />
        </Fragment>
    );
};

ListBar.propTypes = {
    className: PropTypes.string
};

export default ListBar;