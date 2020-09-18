import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider  } from '@material-ui/core/styles';
import { connect } from 'react-redux';
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
            paddingBottom: theme.spacing(1.8),
            alignItems: 'end'
        }
    },
    displyReplyForm: {
        display: "none",
        alignItems: 'start'
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
        color: '#666',
        fontSize: '1.28em',
        paddingTop: theme.spacing(1.5),
        lineHeight: '1.6em'
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
    replyComments: {
        paddingLeft: theme.spacing(11),
        alignItems: 'end'
    },
    replyComment: {
        paddingLeft: theme.spacing(11),
        alignItems: 'center!important'
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
        maxHeight: theme.spacing(64.5)
      },
    newCommentForm: {
        alignItems: 'end'
    }
}));

const CommentProduct = props => {

    const classes = useStyles();

    const { className, mockComments,  favouriteComment, favouriteCommentReply, replys, comments, ...rest } = props;

    const [ commentsData, setCommentsData ] = useState(mockComments);

    const [ valComment, setValComment ] = useState('');

    const [ commentText, setCommentText ] = useState('');

    const handleReply = commentId => {
        const commentChange = [...commentsData].map( comment => comment.id===Number(commentId) ? {...comment, openReply: true} : {...comment, openReply: false});
        setCommentsData(commentChange);
    }

    const handleChange = event => setValComment(event.target.value);

    const handleChangeComment = event => setCommentText(event.target.value);
    
    const handleReplyComment = (event, commentId) => {
        event.preventDefault();
        if( valComment ){

            // gui comment len Store
            // id: Number(commentId), content: valComment
            
            setValComment('');
        }
    }

    const commentPost = () => {
        if( commentText ){
            // console.log(commentText);
            // Binh luan voi noi dung commentText

            setCommentText('');
        }
    }

    const handleFavourite = commentId => {

        favouriteComment(commentId);
    };

    const handleFavouriteReply = (commentId, replyId) => {
        // console.log(commentId, replyId);
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

                            {
                                commentsData.map( comment => (
                                    <React.Fragment key={ comment.id }>
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    aria-label={ comment.name } 
                                                    className={ clsx(classes.avatar)}
                                                    src={ comment.avatar }
                                                >
                                                    { getInitials( comment.name ) }
                                                </Avatar>
                                            }
                                            title={
                                                <React.Fragment>
                                                    <Typography className={ clsx(classes.titleBig, classes.dsInline) } variant="h4">{ comment.name }</Typography>
                                                    <Typography className={ clsx(classes.titleTime, classes.dsInline) } variant="body2"> &nbsp;· { comment.time }</Typography>
                                                </React.Fragment>
                                            }
                                            subheader={ 
                                                <React.Fragment>
                                                    <Typography className={ classes.subtitleBig } variant="body1">{ comment.content }</Typography>
                                                    <Box className={ classes.floatRight }>
                                                        <CardActions disableSpacing>
                                                            <Tooltip 
                                                                placement="bottom" 
                                                                title={ comment.favourite.map( u => u.name + ', ') }
                                                            >
                                                                <IconButton 
                                                                    className={ classes.fontSmall } 
                                                                    aria-label="add to favorites"
                                                                    onClick={ () => handleFavourite( comment.id ) }
                                                                >
                                                                    <FavoriteIcon style={{ color: comment.meVote ? '#f44336' : '#999'}} />
                                                                    <Typography variant="h5">
                                                                        { comment.favourite.length }
                                                                    </Typography>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip placement="top" title="Phản hồi comment">
                                                                <IconButton 
                                                                    className={ classes.fontSmall } 
                                                                    aria-label="add to favorites"
                                                                    onClick={ () => handleReply( comment.id ) }
                                                                >
                                                                    <ReplyIcon style={{ color:"#9c27b0" }} />
                                                                    <Typography variant="overline">
                                                                        Reply
                                                                    </Typography>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </CardActions>
                                                    </Box>
                                                </React.Fragment>
                                            }
                                        />
                                        { comment.replyComments.length
                                            ?
                                            comment.replyComments.map( reply => (
                                                <CardHeader
                                                    className={ clsx( classes.replyComments )}
                                                    avatar={
                                                        <Avatar
                                                            aria-label={ reply.name } 
                                                            className={ clsx(classes.avatar)}
                                                            src={ reply.avatar }
                                                        >
                                                            {getInitials( reply.name )}
                                                        </Avatar>
                                                    }
                                                    title={
                                                        <React.Fragment>
                                                            <Typography className={ clsx(classes.titleBig, classes.dsInline) } variant="h4"> { reply.name } </Typography>
                                                            <Typography className={ clsx(classes.titleTime, classes.dsInline) } variant="body2"> &nbsp;· { reply.time } </Typography>
                                                        </React.Fragment>
                                                    }
                                                    subheader={ 
                                                        <React.Fragment>
                                                            <Typography className={ classes.subtitleBig } variant="body1"> { reply.content } </Typography>
                                                            <Box className={ classes.floatRight }>
                                                                <CardActions disableSpacing>
                                                                    <Tooltip 
                                                                        placement="bottom" 
                                                                        title={ reply.favourite.map( u => u.name + ', ') }
                                                                    >
                                                                        <IconButton 
                                                                            className={ classes.fontSmall } 
                                                                            aria-label="add to favorites"
                                                                            onClick={ () => handleFavouriteReply( comment.id, reply.id ) }
                                                                        >
                                                                            <FavoriteIcon style={{ color: reply.meVote ? '#f44336' : '#999'}} />
                                                                            <Typography variant="h5">
                                                                                { reply.favourite.length }
                                                                            </Typography>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip placement="top" title="Phản hồi comment">
                                                                        <IconButton 
                                                                            className={ classes.fontSmall } 
                                                                            aria-label="add to favorites"
                                                                            onClick={ () => handleReply( comment.id ) }
                                                                        >
                                                                            <ReplyIcon style={{ color:"#9c27b0" }} />
                                                                            <Typography variant="overline">
                                                                                Reply
                                                                            </Typography>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </CardActions>
                                                            </Box>
                                                        </React.Fragment>
                                                    }
                                                />
                                            ))
                                            :
                                            null
                                        }
                                        <CardHeader
                                            className={ clsx( classes.replyComment, !comment.openReply && classes.displyReplyForm )}
                                            avatar={
                                                <Avatar
                                                    aria-label="author" 
                                                    className={ clsx(classes.avatar, classes.avatarReply)}
                                                    src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/christian.b23f7205.jpg' }
                                                >
                                                    {getInitials('Christian Louboutin' )}
                                                </Avatar>
                                            }
                                            title={
                                                <React.Fragment>
                                                    <form onSubmit={ () => handleReplyComment(event, comment.id) }>
                                                        <TextField
                                                            placeholder={ "Reply to " + comment.name + "..."}
                                                            type="text"
                                                            fullWidth
                                                            autoFocus={ comment.openReply }
                                                            onChange={ handleChange }
                                                            value={ valComment }
                                                        />
                                                    </form>
                                                </React.Fragment>
                                            }
                                        />
                                    </React.Fragment>
                                ))
                            }
                            
                        </PerfectScrollbar>
                    </Box>
                    <Typography className={ classes.titleBig, classes.titleContent } variant="h4">Viết comment của bạn</Typography>
                    <Box>
                        <CardHeader
                            className={ clsx( classes.newCommentForm )}
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
                                    id="comment-this-post"
                                    placeholder="Bình luận bài viết..."
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={ commentText }
                                    onChange={ handleChangeComment }
                                />
                            }
                            subheader={
                                <ThemeProvider theme={buttonComment}>
                                    <Button 
                                        className={ classes.buttonComment } 
                                        variant="contained" 
                                        color="primary" 
                                        disableElevation
                                        disabled= { !commentText ? true : false }
                                        onClick={ commentPost }
                                    >
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

const mapStateToProps = (state, ownProps) => {
    return {
        mockComments: state.dataPostDetail.dataComments
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        favouriteComment: commentId => {
            dispatch({
                type: "FAVOURITE_COMMENT",
                commentId: commentId,
            })
        },
        favouriteCommentReply: () => {
            dispatch({

            })
        },
        replys: () => {
            dispatch({

            })
        },
        comments: () => {
            dispatch({

            })
        },
    }
}

CommentProduct.propTypes = {
    mockComments: PropTypes.array.isRequired,
    favouriteComment: PropTypes.func.isRequired,
    favouriteCommentReply: PropTypes.func.isRequired,
    replys: PropTypes.func.isRequired,
    comments: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentProduct)