import axios from 'common/Axios';
import { 
    GET_NOTIFY_RULES, GET_NOTIFY_RULES_SUCCESS,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const GetNotifyRules = dataUpload => async dispatch => {
    
    dispatch({type: GET_NOTIFY_RULES});

    await axios({
        method: 'GET',
        url: 'admin/get-my-notify',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: dataUpload
        })
        .then( res => {
            dispatch( {
                type: GET_NOTIFY_RULES_SUCCESS,
                payload: {
                    notifyRules: res.data.notifyRules,
                }
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
        });

}

export default GetNotifyRules;