import axios from 'common/Axios';
import { 
    UPDATE_MY_PROFILE_SUCCESS, UPDATE_MY_PROFILE_ERROR, UPDATE_MY_PROFILE, 
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN,
} from 'redux/constans';
import { ReadCookie } from 'common';

const UpdateMyProfile = newProfile => async dispatch => {
    
    dispatch({type: UPDATE_MY_PROFILE});

    await axios({
        method: 'POST',
        url: 'admin/update-my-profile',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: newProfile
        })
        .then( res => {
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: res.data.message,
                    type: "info"
                },
            });
            dispatch( {
                type: UPDATE_MY_PROFILE_SUCCESS
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
                type: UPDATE_MY_PROFILE_ERROR
            });
        });
}

export default UpdateMyProfile;