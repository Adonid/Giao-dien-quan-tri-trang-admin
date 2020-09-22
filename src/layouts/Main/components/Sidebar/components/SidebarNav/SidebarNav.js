/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors, Collapse, ListItemIcon, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  fontWeightNormal: {
    fontWeight: 'normal'
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  paddingItemList: {
    paddingLeft: theme.spacing(4)
  },
  
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const [ menus, setMenus ] = useState(pages);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event, name) => {
    event.persist();
    console.log(name);
    console.log(dropMenu);
    // Thay doi cach Expand menu bang cach thay doi state menus. Mai lam
    setOpen(!open);
  };

  const classes = useStyles();

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {menus.map(page => (
            page.items 
            ?
            <React.Fragment>
              <ListItem
                className={classes.item}
                disableGutters
                key={page.title}
              >
                <Button
                  className={classes.button}
                  // component={CustomRouterLink}
                  onClick={ (event) => handleClick( event, page.name ) }
                >
                  <div className={classes.icon}>{page.icon}</div>
                  {page.title}
                  
                </Button>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit className={ classes.paddingItemList }>
                <List component="div" disablePadding>
                  {
                    page.items.map( item => (
                      <ListItem 
                        className={classes.item}
                        disableGutters
                        key={item.title}
                      >
                        <Button
                          activeClassName={classes.active}
                          className={ clsx(classes.button, classes.fontWeightNormal) }
                          component={CustomRouterLink}
                          to={item.href}
                        >
                          {item.title}
                        </Button>
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
            </React.Fragment>
            :
            <ListItem
              className={classes.item}
              disableGutters
              key={page.title}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={page.href}
              >
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
              </Button>
            </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
