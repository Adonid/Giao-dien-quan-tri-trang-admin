import React, { useLayoutEffect, useRef  } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    titleDialog: {
      fontSize: 18,
      fontWeight: 500
    },
    avatar: {
      backgroundColor: red[500],
    },
    colorDanger: {
      color: '#f44336',
      padding: theme.spacing(0.75)
    },
    colorSuccess: {
      color: '#43a047',
      padding: theme.spacing(0.75)
    }
  }));

const AlertNotify = props => {

    const [open, setOpen] = React.useState(false);

    /** Khong xuat hien dialog lan dau khi chay va chi chay khi co su thay doi du lieu vao thay doi */
    const firstUpdate = useRef(true);
    useLayoutEffect (() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      setOpen(true);
    },[props.notify])
    /** End */

    const classes = useStyles();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
      setOpen(false);
    };

    const handleReply = () => {
        setOpen(false);
        // go to page target: props.link
    };

    const handleDelete = () => {
      console.log(props.notify.type);
      console.log(props.notify.ref);
      console.log(props.notify.id);
    }

    const handleMark = () => {
      console.log(props.notify.type);
      console.log(props.notify.ref);
      console.log(props.notify.id);
    }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography className={classes.titleDialog}>Thông báo từ {props.notify.type.toLowerCase()}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <Card className={classes.root}>
                <CardHeader
                    avatar={
                      !props.notify.avatar ? <Avatar aria-label="recipe" className={ classes.avatar }>{props.notify.name.substring(0,1)}</Avatar> : <Avatar alt={ props.notify.name } src={ props.notify.avatar } />
                    }
                    title={<Typography variant="h6" component="p"> { props.notify.name } </Typography>}
                    subheader={<Typography variant="caption">{ props.notify.time }</Typography>}
                />
                <CardContent>
                    <Typography variant="h6" component="span">
                      { props.notify.topic }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="span">
                      { "— " + props.notify.content }
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    
                    <Tooltip title="Xóa thông báo này">
                      <IconButton 
                        className={classes.colorDanger} 
                        aria-label="Xóa thông báo này" 
                        onClick={ handleDelete } >
                          <HighlightOffIcon />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title={ props.notify.isRead ? "Đánh dấu là chưa đọc" : "Đánh dấu là đã đọc" }>
                      <IconButton 
                        className={ props.notify.isRead ? classes.colorSuccess : null } 
                        aria-label="Đánh dấu là đã đọc"
                        onClick={ handleMark }
                        >
                          <AssignmentTurnedInIcon />
                      </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReply} color="primary" autoFocus>
            Phản hồi
          </Button>
          <Button onClick={handleClose} color="secondary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertNotify.PropTypes = {
  // notify : PropTypes.object,
  // open   : PropTypes.bool
};

export default AlertNotify;