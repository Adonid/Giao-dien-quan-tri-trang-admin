import axios from 'common/Axios';
import { LOCK_USERS_SUCCESS, LOCK_USERS_ERROR, LOCK_USERS } from 'redux/constans';
import { ReadCookie } from 'common';

const LockUsers = uids => async dispatch => {
    
    dispatch({type: LOCK_USERS});

    await axios({
        method: 'POST',
        url: 'admin/lock-users',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: uids
        })
        .then( res => {
            dispatch( {
                type: LOCK_USERS_SUCCESS,
                payload: {
                    message: res.data.message,
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: LOCK_USERS_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default LockUsers;