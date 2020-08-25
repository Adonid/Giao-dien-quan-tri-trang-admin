import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, createMuiTheme, ThemeProvider, fade } from '@material-ui/core/styles';
import {  
    Divider,
    Grid,
    Paper,
    Card,
    CardHeader,
    Typography,
    IconButton,
    Badge,
    InputBase,
    Box,
    CardContent,
    ListItem,
    Avatar,
    List,
    ListItemAvatar,
    ListItemText,

 } from '@material-ui/core';
 import PerfectScrollbar from 'react-perfect-scrollbar';
 import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
 import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
 import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
 import SearchIcon from '@material-ui/icons/Search';

 const useStyles = makeStyles(theme => ({
  boxSeach: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  search: {
    height: theme.spacing(5.5),
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    borderRadius: theme.spacing(2.8),
    paddingRight: theme.spacing(2),
    backgroundColor: '#f4f6f8',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#607d8bd6'
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
  },
  cardContent: {
    padding: 0
  },
  activeItem: {
    boxShadow: 'inset 4px 0px 0px #5850EC',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  }
  }));

  const themeBadgeMessage = createMuiTheme({
    palette: {
      error : {
        main: '#8bc34a',
        contrastText: '#fff',
      },
    },
  });

const ChatsList = props => {
    const { open, variant, onClose, className, ...rest } = props;

    const classes = useStyles();
    return (
      <Grid item sm={4}>
        <Paper elevation={0}>
          <Card>
            <CardHeader
              action={
                  <React.Fragment>
                    <IconButton aria-label="settings">
                      <Badge
                        variant="dot"
                        color="secondary"
                      >
                        <AccessTimeOutlinedIcon />
                      </Badge>
                    </IconButton>
                    <IconButton aria-label="chat">
                      <ThemeProvider theme={themeBadgeMessage}>
                        <Badge
                          badgeContent={2}
                          color="error"
                        >
                          <ChatBubbleOutlineOutlinedIcon />
                        </Badge>
                      </ThemeProvider>
                    </IconButton>
                    <IconButton aria-label="group">
                      <ThemeProvider theme={themeBadgeMessage}>
                        <Badge
                          variant="dot"
                          color="error"
                        >
                          <PeopleAltOutlinedIcon />
                        </Badge>
                      </ThemeProvider>
                    </IconButton>
                  </React.Fragment>
              }
              title={<Typography gutterBottom variant="h3" component="h2">Chats</Typography>}
            />
            <Box className={ classes.boxSeach}>
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
            </Box>
            <Divider/>
            <CardContent className={ classes.cardContent }>
              <List>
                <ListItem
                  button
                  gutters
                  className={ clsx(classes.activeItem) }
                >
                  <ListItemAvatar>
                    <Avatar
                      className={classes.avatar}
                      src={'/images/avatars/avatar_1.png'}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={ <Typography component="h5" variant="h6"> Nguyễn Văn Danh</Typography>} 
                    secondary={ <Typography component="h5" variant="body2">Cám ơn bạn )) · 2 giờ trước</Typography>}
                  />
                </ListItem>
                <ListItem
                  button
                  gutters
                  className={ clsx(classes.activeItem) }
                >
                  <ListItemAvatar>
                    <Avatar
                      className={classes.avatar}
                      src={'/images/avatars/avatar_2.png'}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={ <Typography component="h5" variant="h6"> Dương Viết Lâm</Typography>} 
                    secondary={ <Typography noWrap component="h5" variant="body2">Bạn: Bạn có thể mua 2 khóa đẻ được giảm giá · 1 giờ trước</Typography>}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    );
};

ChatsList.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
};

export default ChatsList;