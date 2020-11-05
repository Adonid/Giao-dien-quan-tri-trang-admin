import axios from 'common/Axios';
import { 
     SEND_ACTION,
     SEND_ACTION_SUCCESS,
     SEND_ACTION_ERROR,
     LOGOUT_ADMIN,
     MESSAGE_MAIN,
     MESSAGE_MINI
} from 'redux/constans';
import { ReadCookie } from 'common';

const LockUsers = uid => async dispatch => {
    
    dispatch({type: SEND_ACTION});

    await axios({
        method: 'POST',
        url: 'admin/send-password-reset-email',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: { uid: uid }
        })
        .then( res => {
            dispatch({type: SEND_ACTION_SUCCESS});
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
            dispatch({type: SEND_ACTION_ERROR});
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "error"
                }
            });
        });
}

export default LockUsers;