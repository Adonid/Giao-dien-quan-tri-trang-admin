import axios from 'common/Axios';
import { 
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN,
} from 'redux/constans';
import { ReadCookie } from 'common';

const UpdateUser = dataUpdate => async dispatch => {
    
    dispatch({type: UPDATE_USER});

    await axios({
        method: 'POST',
        url: 'admin/update-account-user',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: dataUpdate
        })
        .then( res => {
            dispatch( {type: UPDATE_USER_SUCCESS});
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: res.data.message,
                    type: "info"
                }
            });
        })
        .catch( error => {
            console.log(error);
            console.log(typeof error);
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
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: {
                    loading: false
                }
            });
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "error"
                }
            });
        });

}

export default UpdateUser;