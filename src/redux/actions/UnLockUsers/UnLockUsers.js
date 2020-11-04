import axios from 'common/Axios';
import { 
     LOADING_CONFIRM,
     LOGOUT_ADMIN,
     MESSAGE_MAIN,
     MESSAGE_MINI,
     CLOSE_DIALOG_CONFIRM
} from 'redux/constans';
import { ReadCookie } from 'common';

const LockUsers = uid => async dispatch => {
    
    dispatch({type: LOADING_CONFIRM});

    await axios({
        method: 'POST',
        url: 'admin/unlock-user',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: { uid: uid }
        })
        .then( res => {
            dispatch({type: CLOSE_DIALOG_CONFIRM});
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: res.data.message,
                    type: "info"
                }
            });
        })
        .catch( error => {
            if(typeof(error.response.data.exit) !== 'undefined'){
                dispatch( {
                    type: LOGOUT_ADMIN,
                    payload: {
                        logged: false
                    },
                });
                dispatch( {
                    type: MESSAGE_MINI,
                    payload: {
                        message: error.response.data.message,
                        type: "warning"
                    },
                });
            }
            dispatch({type: CLOSE_DIALOG_CONFIRM});
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "warning"
                }
            });
        });
}

export default LockUsers;