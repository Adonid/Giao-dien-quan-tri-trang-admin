import axios from 'common/Axios';
import { 
    UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const UpdatePassword = paswords => async dispatch => {
    
    dispatch({type: UPDATE_PASSWORD});

    await axios({
        method: 'POST',
        url: 'admin/update-my-password',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: paswords
        })
        .then( res => {
            dispatch( {
                type: UPDATE_PASSWORD_SUCCESS,
                payload: {
                    message: '',
                }
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
                type: UPDATE_PASSWORD_ERROR,
                payload: {
                    message: error.response.data.message,
                }
            });
        });

}

export default UpdatePassword;