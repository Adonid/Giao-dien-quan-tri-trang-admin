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
      },
    paddingContent: {
        paddingLeft: theme.spacing(4), 
        paddingRight: theme.spacing(4), 
      },
    paddingTags: {
        paddingTop: theme.spacing(17),
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
        marginBottom: '0.75rem',
        textDecoration: 'none',
    },
    subtitleBig: {
        color: '#999',
        fontSize: '1rem',
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
                        <div class="MuiGrid-root jss131  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8 MuiGrid-grid-md-8">
                            <h3 class="jss133">The Castle Looks Different at Night...</h3>
                            <p>This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here. Add a button if you want the user to see more. We are here to make life better.<br /><br />And now I look and look around and there&rsquo;s so many Kanyes I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound... and thank you for turning my personal jean jacket into a couture piece.</p>
                            <blockquote class="jss145 jss147">
                            <p class="jss148 jss135">&ldquo;And thank you for turning my personal jean jacket into a couture piece.&rdquo;</p>
                            <small class="jss149">Kanye West, Producer.</small></blockquote>
                            </div>
                            <div class="MuiGrid-root jss131 jss134 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-10 MuiGrid-grid-md-10">
                            <div class="MuiGrid-root jss130  MuiGrid-container">
                            <div class="MuiGrid-root jss131  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-4"><img class="jss139 jss137 jss136" src="https://demos.creative-tim.com/material-kit-pro-react/static/media/blog4.5de2130f.jpg" alt="..." /></div>
                            <div class="MuiGrid-root jss131  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-4"><img class="jss139 jss137 jss136" src="https://demos.creative-tim.com/material-kit-pro-react/static/media/blog3.a4ee46b8.jpg" alt="..." /></div>
                            <div class="MuiGrid-root jss131  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-4"><img class="jss139 jss137 jss136" src="https://demos.creative-tim.com/material-kit-pro-react/static/media/blog1.9313c5c1.jpg" alt="..." /></div>
                            </div>
                            </div>
                            <div class="MuiGrid-root jss131  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-8 MuiGrid-grid-md-8">
                            <h3 class="jss133">Rest of the Story:</h3>
                            <p>We are here to make life better. And now I look and look around and there&rsquo;s so many Kanyes I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound... and thank you for turning my personal jean jacket into a couture piece.<br />I speak yell scream directly at the old guard on behalf of the future. daytime All respect prayers and love to Phife&rsquo;s family Thank you for so much inspiration.</p>
                            <p>Thank you Anna for the invite thank you to the whole Vogue team And I love you like Kanye loves Kanye Pand Pand Panda I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound...The Pablo pop up was almost a pop up of influence. All respect prayers and love to Phife&rsquo;s family Thank you for so much inspiration daytime I love this new Ferg album! The Life of Pablo is now available for purchase I have a dream. Thank you to everybody who made The Life of Pablo the number 1 album in the world! I'm so proud of the nr #1 song in the country. Panda! Good music 2016!</p>
                            <p>I love this new Ferg album! The Life of Pablo is now available for purchase I have a dream. Thank you to everybody who made The Life of Pablo the number 1 album in the world! I'm so proud of the nr #1 song in the country. Panda! Good music 2016!</p>
                        </div>
                    </Box>
                    {/* Content */}

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
                                    src={ '' }
                                >
                                    {getInitials('Lê Dũng' )}
                                </Avatar>
                            }
                            title={ <Typography className={ classes.titleBig } variant="h4">Alec Thompson</Typography>}
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