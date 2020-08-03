import React, { useState, Fragment} from 'react';
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

import mockData from './data';
import AlertNotify from './AlertNotify';
// import { Snackbars } from 'alerts';

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    content: {
      display: 'inline',
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

    const [notifys, setNotifys] = useState(mockData);

    const [alert, setAlert] = useState({type:'',ref:0,id:0,name:'S',avatar:'',topic:'',content:'',time:'',link:'',isRead:false});

    const [element, setElement] = useState(null);

    const [ openAlert, setOpenAlert ] = useState(false);

    const [ dataAlert, setDataAlert ] = useState('');

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

        // Dua sang component thong bao
        setAlert(notify);
        // end
        // Luu lai doi tuong notify
        setElement(event.currentTarget);
        // end

        /** api danh dau la da doc */

        /** end */

        // Danh dau la da doc
        event.currentTarget.setAttribute("class", target.getAttribute("class").replace("Mui-selected", ""));
        // end
        // Dong MENU
        closeMenu();
        // end
    }

    /** CALL API */
    const apiReMarkNote = el => {
        // ref : la thuoc cum tin nhan(bang) nao
        // id  : id cua tin nhan
        // isRead: tinh trang da doc tin nhan hay chua

        /** Call api de thuc hien MARK READED */

        /** end */

        // Sau do danh dau tinh trang tin nhan
        element.setAttribute("class", el.isRead ? element.getAttribute("class").replace("Mui-selected", "") : element.getAttribute("class")+" Mui-selected");
    }

    const apiDeleteNote = el => {
        // ref : la thuoc cum tin nhan(bang) nao
        // id  : id cua tin nhan
        // isRead: tinh trang da doc tin nhan hay chua

        /** Call api de thuc hien DELETE */

        /** end */

        // Sau do cap nhat lai notifys
        element.nextSibling.remove();
        element.remove();
    }

    const apiDeleteAll = () => {

        /** api xoa het cac thong bao */

        /** end */
        // Sau do dua ra hien thi
        setNotifys([]);
        closeMenu();
    }

    const apiMarkAll = () => {

        /** api danh dau tat ca thong bao da duoc doc */

        /** end */
        
        // Sau do refresh lai trang thai
        let newNotifys = [...notifys];
        newNotifys.map( el => {
            el.items.map( item => {
                item.isRead = true;
            })
        })
        setNotifys(newNotifys);
    }

    const apiReply = rep => {
        /** api reply vao nguoi binh luan bai viet */

        /** end */
        
        /** Goi Redux de show ra SnackBar */
        
        // setDataAlert({ type: "info", content: "Đã gửi bình luận tới " + rep.name });
    }
    /** END */

    return (
        <Fragment>
            {
                notifys.map( cluster => (
                    <List key={cluster.ref} subheader={<ListSubheader> {cluster.type} </ListSubheader>} className={classes.root}>
                        {
                            cluster.items.map( item => (
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
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt={ item.name } src={ item.avatar } />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={ item.name }
                                            secondary={
                                                <Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.content}
                                                    color="textPrimary"
                                                >
                                                    { item.topic }
                                                </Typography>
                                                {"— " + item.content}
                                                <Typography className={classes.time} variant="caption" color="initial" gutterTop>
                                                    { item.time }
                                                </Typography>
                                                </Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </Fragment>
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

            <AlertNotify notify={ alert } apiReMarkNote={ el => apiReMarkNote(el) } apiDeleteNote={ el => apiDeleteNote(el) } apiReply={ reply => apiReply(reply) } />
            
            {/* <Snackbars data={ dataAlert }/> */}
        </Fragment>
    );
};

ListNotifys.propTypes = {
    className: PropTypes.string,
    closeMenu: PropTypes.func
};

export default ListNotifys;