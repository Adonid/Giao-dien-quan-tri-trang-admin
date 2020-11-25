import axios from 'common/Axios';
import { 
    UPDATE_NOTIFY_RULES, UPDATE_NOTIFY_RULES_SUCCESS, UPDATE_NOTIFY_RULES_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const UpdateNotifyRules = newRules => async dispatch => {
    
    dispatch({type: UPDATE_NOTIFY_RULES});

    await axios({
        method: 'POST',
        url: 'admin/update-my-notify',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: newRules
        })
        .then( res => {
            dispatch( {
                type: UPDATE_NOTIFY_RULES_SUCCESS,
            });
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: res.data.message,
                    type: "info"
                },
            });
        })
        .catch( error => {
            if(typeof(error.response.data.exit) === 'boolean'){
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
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "warning"
                },
            });
            dispatch( {
                type: UPDATE_NOTIFY_RULES_ERROR,
            });
        });

}

export default UpdateNotifyRules;