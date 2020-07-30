import React, { useState, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, fade } from '@material-ui/core/styles';
import { 
  AppBar, 
  Toolbar, 
  Badge, 
  Hidden, 
  IconButton, 
  Menu,
  InputBase
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import SearchIcon from '@material-ui/icons/Search';
import { ListBar } from 'elements';

const useStyles = makeStyles(theme => ({  
  root: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyles();

  const [notifications] = useState([1,2,3]);

  const notify = [
    {
      type: "Người dùng",
      items: [
        {
          id      : 1,
          name    : "Lê Viết Dũng",
          avatar  : "/images/avatars/avatar_1.png",
          topic   : "Ali Connors",
          content : "I'll be in your neighborhood doing errands this..",
          time    : "5 phút trước"
        },
        {
          id      : 2,
          name    : "Nguyễn Thế Cường",
          avatar  : "/images/avatars/avatar_2.png",
          topic   : "to Scott, Alex, Jennifer",
          content : "Wish I could come, but I'm out of town this…",
          time    : "15 phút trước"
        },
        {
          id      : 3,
          name    : "Trần Đơn",
          avatar  : "/images/avatars/avatar_3.png",
          topic   : "Sandra Adams",
          content : "Do you have Paris recommendations? Have you ever…",
          time    : "1 giờ trước"
        },
      ]
    },
    {
      type: "Hệ thống",
      items: [
        {
          id      : 1,
          name    : "Dịch vụ email",
          avatar  : "/images/avatars/avatar_4.png",
          topic   : "Trả lời comment",
          content : "Hãy trả lời các câu hỏi cho độc giả của bạn..",
          time    : "2 giờ trước"
        }
      ]
    }
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.boxShadow, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          />
        </RouterLink>
        <div className={classes.root} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Hidden smDown>
          <IconButton 
            color="inherit"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <Badge
              badgeContent={notifications.length}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            {/* Dua LIST vao component moi */}
            <ListBar notify={notify} />

          </Menu>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
