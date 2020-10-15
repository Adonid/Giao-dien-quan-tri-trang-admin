import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import ArtTrackOutlinedIcon from '@material-ui/icons/ArtTrackOutlined';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      id: 1,
      title: 'Giao diện chính',
      href: '/dashboard',
      icon: <DashboardOutlinedIcon />
    },
    {
      id: 2,
      title: 'Người dùng',
      href: '/users',
      icon: <SupervisorAccountOutlinedIcon />,
    },
    {
      id: 3,
      title: 'Bài viết',
      href: '/products',
      icon: <ArtTrackOutlinedIcon />,
      items: [
        {
          title: 'Danh sách bài viết',
          href: '/products',
        },
        {
          title: 'Bài viết mới',
          href: '/add-new-product',
        },
      ],
      isOpen: false
    },
    {
      id: 4,
      title: 'Xác thực',
      href: '/sign-in',
      icon: <LockOpenIcon />
    },
    {
      id: 5,
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />
    },
    {
      id: 6,
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />
    },
    {
      id: 7,
      title: 'Phòng Chat',
      href: '/chats-room',
      icon: <ChatBubbleOutlineIcon />
    },
    {
      id: 8,
      title: 'Tài khoản của tôi',
      href: '/account',
      icon: <AccountBoxOutlinedIcon />
    },
    {
      id: 9,
      title: 'Cài đặt',
      href: '/settings',
      icon: <SettingsOutlinedIcon />
    },
    {
      id: 10,
      title: 'Danh mục & tag',
      href: '/category-tag',
      icon: <LocalOfferOutlinedIcon />
    },
    {
      id: 11,
      title: 'Điều khoản sử dụng',
      href: '/terms-used',
      icon: <GavelOutlinedIcon />
    },
  ];

  return (
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open={open}
        variant={variant}
      >
        <PerfectScrollbar>
          <div
            {...rest}
            className={clsx(classes.root, className)}
          >
              <Profile />
              <Divider className={classes.divider} />
              <SidebarNav
                className={classes.nav}
                pages={pages}
              />
              <UpgradePlan />
          </div>
        </PerfectScrollbar>
      </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
