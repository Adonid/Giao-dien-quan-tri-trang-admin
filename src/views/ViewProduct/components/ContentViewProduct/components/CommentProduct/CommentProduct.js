import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider  } from '@material-ui/core/styles';
import { 
    Card, 
    CardContent,
    Grid,
    CardHeader,
    Divider, 
    Avatar, 
    Typography, 
    Box, 
    TextField, 
    Button, 
    CardActions, 
    Tooltip, 
    IconButton
    
 } from '@material-ui/core';
 import PerfectScrollbar from 'react-perfect-scrollbar';
 import FavoriteIcon from '@material-ui/icons/Favorite';
 import ReplyIcon from '@material-ui/icons/Reply';
 import { getInitials } from 'helpers';

 
const buttonComment = createMuiTheme({
    palette: {
        primary : {
            contrastText: '#fff',
            main: '#9c27b0'
        },
    },
  });


 const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiCardHeader-root': {
            paddingBottom: theme.spacing(1.8)
        }
    },
    displyReplyForm: {
        display: "none",
    },
    avatar: {
        maxWidth: theme.spacing(7),
        maxHeight: theme.spacing(7),
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: '#3C4858',
        marginTop: '.625rem',
        minHeight: 'auto',
        fontWeight: 700,
        fontSize: 17,
        marginBottom: '0.75rem',
        textDecoration: 'none',
        // backgroundColor: '#FF5722',
        boxShadow: '0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
    },
    avatarReply: {
        maxWidth: theme.spacing(5),
        maxHeight: theme.spacing(5),
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    subtitleBig: {
        color: '#999',
        fontSize: 15,
        paddingTop: theme.spacing(1.5)
    },
    titleBig: {
        color: '#3C4858',
        marginTop: '.625rem',
        minHeight: 'auto',
        fontWeight: 700,
        fontSize: 17,
        marginBottom: '0.75rem',
        textDecoration: 'none',
    },
    dsInline: {
        display: 'inline'
    },
    replyComment: {
        paddingLeft: theme.spacing(11)
    },
    buttonComment: {
        float: 'right',
        borderRadius: '30px',
        boxShadow: '0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2), 0 1px 5px 0 rgba(156, 39, 176, 0.12)',
        border: 'none',
        margin: '.8125rem 1px',
        padding: '12px 30px',
        position: 'relative',
        fontSize: '12px',
        minWidth: 'auto',
    },
    titleContent: {
        color: '#3C4858',
        marginTop: '.625rem',
        minHeight: 'auto',
        fontWeight: 700,
        fontSize: 21,
        marginBottom: '0.75rem',
        textDecoration: 'none',
        textAlign: 'center'
    },
    floatRight: {
        float: 'right'
    },
    fontSmall: {
        '& .MuiSvgIcon-root, & .MuiTypography-root': {
            color: '#999',
            fontWeight: 400,
            lineHeight: 1.42857143,
            borderRadius: 3,
        },
        '& .MuiSvgIcon-root': {
            fontSize: 17,
        },
        '& .MuiTypography-root': {
            fontSize: 13,
            paddingLeft: 3
        }
    },
    maxHeightPerfectScrollbar: {
        maxHeight: theme.spacing(63)
      },
}));

const CommentProduct = props => {

    const classes = useStyles();

    const { className, ...rest } = props;

    const handleFavourite = idComment => {
        console.log(idComment);
    }

    const handleReply = idComment => {
        console.log(idComment);
    }

    return (
        <Grid item xs={12} sm={8}>
                    
            <Card
                {...rest}
            >
                <CardHeader title="Bình luận & yêu thích" />
                
                <Divider/>

                <CardContent>
                    <Box className={ classes.root }>
                        <PerfectScrollbar className={ classes.maxHeightPerfectScrollbar }>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label="author" 
                                        className={ clsx(classes.avatar)}
                                        src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/card-profile1-square.3122abf4.jpg' }
                                    >
                                        {getInitials('Lê Dũng' )}
                                    </Avatar>
                                }
                                title={
                                    <React.Fragment>
                                        <Typography className={ clsx(classes.titleBig, classes.dsInline) } variant="h4">Alec Thompson</Typography>
                                        <Typography className={ clsx(classes.titleTime, classes.dsInline) } variant="body2"> &nbsp;· 7 minutes ago</Typography>
                                    </React.Fragment>
                                }
                                subheader={ 
                                    <React.Fragment>
                                        <Typography className={ classes.subtitleBig } variant="body1">I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound...I like good music from Youtube.</Typography>
                                        <Box className={ classes.floatRight }>
                                            <CardActions disableSpacing>
                                                <Tooltip placement="top" title="Yêu thích">
                                                    <IconButton 
                                                        className={ classes.fontSmall } 
                                                        aria-label="add to favorites"
                                                        onClick={ () => handleFavourite(1) }
                                                    >
                                                        <FavoriteIcon />
                                                        <Typography variant="h5">
                                                            7
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip placement="top" title="Phản hồi comment">
                                                    <IconButton 
                                                        className={ classes.fontSmall } 
                                                        aria-label="add to favorites"
                                                        onClick={ () => handleReply(1) }
                                                    >
                                                        <ReplyIcon />
                                                        <Typography variant="h5">
                                                            Reply
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Box>
                                    </React.Fragment>
                                }
                            />
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label="author" 
                                        className={ clsx(classes.avatar)}
                                        src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/card-profile6-square.1f1f4900.jpg' }
                                    >
                                        {getInitials('Lê Dũng' )}
                                    </Avatar>
                                }
                                title={
                                    <React.Fragment>
                                        <Typography className={ clsx(classes.titleBig, classes.dsInline) } variant="h4">Alec Thompson</Typography>
                                        <Typography className={ clsx(classes.titleTime, classes.dsInline) } variant="body2"> &nbsp;· 7 minutes ago</Typography>
                                    </React.Fragment>
                                }
                                subheader={ 
                                    <React.Fragment>
                                        <Typography className={ classes.subtitleBig } variant="body1">I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound...I like good music from Youtube.</Typography>
                                        <Box className={ classes.floatRight }>
                                            <CardActions disableSpacing>
                                                <Tooltip placement="top" title="Yêu thích">
                                                    <IconButton 
                                                        className={ classes.fontSmall } 
                                                        aria-label="add to favorites"
                                                        onClick={ () => handleFavourite(2) }
                                                    >
                                                        <FavoriteIcon />
                                                        <Typography variant="h5">
                                                            7
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip placement="top" title="Phản hồi comment">
                                                    <IconButton 
                                                        className={ classes.fontSmall } 
                                                        aria-label="add to favorites"
                                                        onClick={ () => handleReply(2) }
                                                    >
                                                        <ReplyIcon />
                                                        <Typography variant="h5">
                                                            Reply
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Box>
                                    </React.Fragment>
                                }
                            />
                            {/* Neu comment co comment duoc reply thi show ra nhu CardHeader duoi day */}
                            <CardHeader
                                className={ clsx( classes.replyComment )}
                                avatar={
                                    <Avatar
                                        aria-label="author" 
                                        className={ clsx(classes.avatar)}
                                        src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/card-profile4-square.1a164917.jpg' }
                                    >
                                        {getInitials('Lê Dũng' )}
                                    </Avatar>
                                }
                                title={
                                    <React.Fragment>
                                        <Typography className={ clsx(classes.titleBig, classes.dsInline) } variant="h4">Alec Thompson</Typography>
                                        <Typography className={ clsx(classes.titleTime, classes.dsInline) } variant="body2"> &nbsp;· 7 minutes ago</Typography>
                                    </React.Fragment>
                                }
                                subheader={ 
                                    <React.Fragment>
                                        <Typography className={ classes.subtitleBig } variant="body1">I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound...I like good music from Youtube.</Typography>
                                        <Box className={ classes.floatRight }>
                                            <CardActions disableSpacing>
                                                <Tooltip placement="top" title="Yêu thích">
                                                    <IconButton 
                                                    className={ classes.fontSmall } 
                                                    aria-label="add to favorites"
                                                    onClick={ () => handleFavourite(2) }
                                                    >
                                                        <FavoriteIcon />
                                                        <Typography variant="h5">
                                                            7
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip placement="top" title="Phản hồi comment">
                                                    <IconButton 
                                                        className={ classes.fontSmall } 
                                                        aria-label="add to favorites"
                                                        onClick={ () => handleReply(2) }
                                                    >
                                                        <ReplyIcon />
                                                        <Typography variant="h5">
                                                            Reply
                                                        </Typography>
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Box>
                                    </React.Fragment>
                                }
                            />
                            {/* Het moi comment thi cho ra 1 form de nhap reply comment nhu duoi day */}
                            <CardHeader
                                className={ clsx( classes.replyComment, false&&classes.displyReplyForm )}
                                avatar={
                                    <Avatar
                                        aria-label="author" 
                                        className={ clsx(classes.avatar, classes.avatarReply)}
                                        src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/card-profile4-square.1a164917.jpg' }
                                    >
                                        {getInitials('Lê Dũng' )}
                                    </Avatar>
                                }
                                title={
                                    <React.Fragment>
                                        <form>
                                            <TextField
                                                placeholder="Aa..."
                                                type="text"
                                                fullWidth
                                                // onChange={handleChange}
                                            />
                                        </form>
                                    </React.Fragment>
                                }
                            />
                        </PerfectScrollbar>
                    </Box>
                    <Typography className={ classes.titleBig, classes.titleContent } variant="h4">Viết comment của bạn</Typography>
                    <Box>
                        <CardHeader
                            // className={ clsx( classes.replyComment )}
                            avatar={
                                <Avatar
                                    aria-label="author" 
                                    className={ clsx(classes.avatar)}
                                    src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/card-profile4-square.1a164917.jpg' }
                                >
                                    {getInitials('Lê Dũng' )}
                                </Avatar>
                            }
                            title={
                                <TextField
                                    id="standard-multiline-static"
                                    label="Bình luận tiếp cho ai đó..."
                                    multiline
                                    fullWidth
                                    rows={3}
                                />
                            }
                            subheader={
                                <ThemeProvider theme={buttonComment}>
                                    <Button className={ classes.buttonComment } variant="contained" color="primary" disableElevation>
                                        POST COMMENT
                                    </Button>
                                </ThemeProvider>
                             }
                        />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

CommentProduct.propTypes = {
    
};

export default CommentProduct;