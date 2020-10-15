import React, { useState, Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
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

import AlertNotify from './AlertNotify';

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    content: {
      display: 'block',
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
    marginBottom: {
        marginBottom: theme.spacing(0.25)
    }
  }));
  
const ListNotifys = props => {
    const {closeMenu, className, ...rest} = props;

    const classes = useStyles();

    const [notifys, setNotifys] = useState(props.notifys);

    const [alert, setAlert] = useState({type:'',ref:0,id:0,name:'S',avatar:'',topic:'',content:'',time:'',link:'',read:'0'});

    const [element, setElement] = useState(null);

    useEffect( () => {
        setNotifys(props.notifys);
    }, [props.notifys]);

    const handleNotify = event => {
        const target = event.currentTarget;
        let notify = {};
        notify.type = target.getAttribute("notify-type");
        notify.ref = target.getAttribute("notify-ref");
        notify.id = target.getAttribute("notify-id");
        notify.name = target.getAttribute("notify-name");
        notify.avatar = target.getAttribute("notify-avatar");
        notify.topic = target.getAttribute("notify-topic");
        notify.content = target.getAttribute("notify-content");
        notify.time = target.getAttribute("notify-time");
        notify.link = target.getAttribute("notify-link");
        notify.read = target.getAttribute("notify-read");

        // Dua sang component thong bao
        setAlert(notify);
        // end
        // Luu lai doi tuong notify
        setElement(event.currentTarget);
        // end

        /** DISPATH danh dau la da doc */
        props.markNote({ ref: notify.ref, id: notify.id, isRead: true, name: notify.name });
        /** end */

        // Dong MENU
        closeMenu();
        // end
    }

    /** CALL API */
    const apiReMarkNote = el => {

        /** DISPATH thay doi da doc hay chua doc */
        props.markNote(el);
        /** end */

    }

    const apiDeleteNote = () => {

        /** DISPATH xoa thong bao */
        props.deleteNote({ ref: alert.ref, id: alert.id, name: alert.name });
        /** end */

    }

    const apiDeleteAll = () => {

        /** DISPATH xoa tat ca thong bao */
        props.deleteAll();
        /** end */

        // Dong MENU
        closeMenu();
        // end
    }

    const apiMarkAll = () => {
        
        /** DISPATH danh dau tat ca la da doc */
        props.markAll();
        /** end */

    }

    /** DISPATH reply */
    const apiReply = rep => props.replyReader({ ref: alert.ref, id: alert.id, name: rep.name });
    /** end */

    /** END */

    return (
        <Fragment>
            {
                notifys.map( cluster => (
                    <List key={cluster.ref} subheader={<ListSubheader> {cluster.type} </ListSubheader>} className={classes.root}>
                        {
                            cluster.items.map( item => (
                                !item.isDelete ? 
                                    <Fragment key={ item.id }>
                                        <ListItem 
                                            className={classes.marginBottom}
                                            button 
                                            alignItems="flex-start"
                                            onClick={ handleNotify }
                                            notify-type={ cluster.type }
                                            notify-ref={ cluster.ref }
                                            selected={ !item.isRead }
                                            notify-id={ item.id }
                                            notify-name={ item.name }
                                            notify-avatar={ item.avatar }
                                            notify-topic={ item.topic }
                                            notify-content={ item.content }
                                            notify-time={ item.time }
                                            notify-read={ item.isRead ? '1' : '0' }
                                        >
                                            <ListItemAvatar>
                                                <Avatar alt={ item.name } src={ item.avatar } />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={ <b>{item.name}</b> }
                                                secondary={
                                                    <Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.content}
                                                        color="textPrimary"
                                                    >
                                                        <b>{ item.topic }</b>
                                                    </Typography>
                                                    {"— " + item.content}
                                                    <Typography className={classes.time} variant="caption" color="initial" >
                                                        { item.time }
                                                    </Typography>
                                                    </Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </Fragment>
                                : null
                            ))
                        }
                    </List>
                ))
            }

            <Divider />
            <List className={classes.footerList}>
                {
                    notifys.length 
                    ? 
                        <Fragment>
                            <ListItem>
                                <Link component="button" color="inherit" underline="none" onClick={ apiDeleteAll }>
                                    <Typography variant="caption">Xóa tất cả</Typography>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link component="button" color="inherit" underline="none" onClick={ apiMarkAll }>
                                    <Typography variant="caption">Đã đọc tất cả</Typography>
                                </Link>
                            </ListItem>
                        </Fragment>
                    : 
                        <ListItem>
                            <Link color="inherit" underline="none" >
                                <Typography variant="caption">Không có thông báo</Typography>
                            </Link>
                        </ListItem>
                }
                
            </List>
            <Divider />

            <AlertNotify notify={ alert } apiReMarkNote={ el => apiReMarkNote(el) } apiDeleteNote={ () => apiDeleteNote() } apiReply={ reply => apiReply(reply) } />
            
        </Fragment>
    );
};

ListNotifys.propTypes = {
    className: PropTypes.string,
    closeMenu: PropTypes.func
};

    const mapStateToProps = (state, ownProps) => {
        return {
            notifys: state.dataNotifys.notifys
        }
    }

    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            replyReader: dataReply => {
                dispatch({
                    type: 'REPLY',
                    data: dataReply
                })
            },
            markAll: () => {
                dispatch({
                    type: 'MARKALL'
                })
            },
            deleteAll: () => {
                dispatch({
                    type: 'DELETEALL'
                })
            },
            deleteNote: note => {
                dispatch({
                    type: 'DELETENOTE',
                    note: note
                })
            },
            markNote: note => {
                dispatch({
                    type: 'MARKNOTE',
                    not: note
                })
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(ListNotifys)