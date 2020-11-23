import axios from 'common/Axios';
import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE, 
    LOGOUT_ADMIN,
    MESSAGE_MINI
} from 'redux/constans';
import { ReadCookie } from 'common';

const UpdateProfile = newProfile => async dispatch => {
    
    dispatch({type: UPDATE_PROFILE});

    await axios({
        method: 'POST',
        url: 'admin/',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: newProfile
        })
        .then( res => {
            dispatch( {
                type: UPDATE_PROFILE_SUCCESS,
                payload: {
                    profile: res.data.data.UpdateProfile,
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
                type: UPDATE_PROFILE_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default UpdateProfile;