import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { 
    Card, 
    CardContent,
    Grid,
    Divider,
    CardActions,
    IconButton, 
    Typography, 
    CardHeader,
    Avatar,
    Box, 
    Tooltip

 } from '@material-ui/core';
 import { createMuiTheme, makeStyles  } from '@material-ui/core/styles';
 import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
 import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
 import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
 import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
 import { getInitials } from 'helpers';

 const useStyles = makeStyles(theme => ({
    root: {},
    inlineFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    avatar: {
        backgroundColor: '#FF5722',
        boxShadow: '0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
      },
    paddingContent: {
        paddingLeft: theme.spacing(4), 
        paddingRight: theme.spacing(4), 
      },
    paddingTags: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(2.3),
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: 17
    },
    tag: {
        backgroundColor: '#9c27b0',
        color: '#FFF',
        display: 'inline-block',
        padding: '5px 12px',
        fontSize: '10px',
        textAlign: 'center',
        fontWeight: 500,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        marginRight: '3px',
        borderRadius: '12px',
        textTransform: 'uppercase',
        verticalAlign: 'baseline',
    },
    avatarBig: {
        maxWidth: 130,
        maxHeight: 130,
        width: 85,
        height: 85,
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
    subtitleBig: {
        color: '#999',
        fontSize: 15,
    }
}));

const FixedContent = props => {

    const classes = useStyles();

    const { className, ...rest } = props;

    return (
        <Grid item xs={12}>
            <Card
                className={ classes.paddingContent }
                {...rest}
            >
                <Box className={ classes.inlineFlex }>
                    <CardActions disableSpacing>
                        <Tooltip placement="bottom" title="Lượt đánh giá">
                            <IconButton aria-label="add to favorites">
                                <GradeOutlinedIcon />
                                <Typography variant="h5">
                                    7
                                </Typography>
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Lượt yêu thích">
                            <IconButton aria-label="add to favorites">
                                <FavoriteBorderOutlinedIcon />
                                <Typography variant="h5">
                                    12
                                </Typography>
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Số người đã đọc">
                            <IconButton aria-label="Reader">
                                <VisibilityOutlinedIcon />
                                <Typography variant="h5">
                                    127
                                </Typography>
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Lượt chia sẻ">
                            <IconButton aria-label="share">
                                <ShareOutlinedIcon />
                                <Typography variant="h5">
                                    9
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="author" 
                                className={classes.avatar}
                                src={ '' }
                            >
                                {getInitials('Lê Dũng' )}
                            </Avatar>
                        }
                        title={ <Typography variant="h6">Lê Dũng</Typography>}
                    />
                </Box>
                <Divider/>

                <CardContent>

                    <Box>
                        {/* Content */}
                    </Box>

                    <Box className={ classes.paddingTags}>
                        <Typography variant="span" >Gắn tags: </Typography>
                        <Typography className={ classes.tag } variant="span" >Tags 1</Typography>
                        <Typography className={ classes.tag } variant="span" >Tags 2</Typography>
                        <Typography className={ classes.tag } variant="span" >Tags 3</Typography>
                    </Box>
                    <Divider/>
                    <Box>
                        <CardHeader
                            avatar={
                                <Avatar
                                    aria-label="author" 
                                    className={ clsx(classes.avatarBig,classes.avatar )}
                                    src={ 'https://demos.creative-tim.com/material-kit-pro-react/static/media/card-profile4-square.1a164917.jpg' }
                                >
                                    {getInitials('Lê Dũng' )}
                                </Avatar>
                            }
                            title={ <Typography className={ classes.titleBig } variant="h4">Alec Thompson</Typography> }
                            subheader={ <Typography className={ classes.subtitleBig } variant="body1">I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound...I like good music from Youtube.</Typography>}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

FixedContent.propTypes = {
    
};

export default FixedContent;