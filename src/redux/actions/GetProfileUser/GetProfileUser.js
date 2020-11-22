import axios from 'common/Axios';
import { 
    GET_PROFILE_USER_SUCCESS, GET_PROFILE_USER,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const GetProfileUser = () => async dispatch => {
    
    dispatch({type: GET_PROFILE_USER});

    await axios({
        method: 'GET',
        url: 'admin/get-profile-user',
        headers: { Authorization: "Bearer " + ReadCookie()},
        })
        .then( res => {
            dispatch( {
                type: GET_PROFILE_USER_SUCCESS,
                payload: {
                    profile: res.data.profile,
                    profileExtend: res.data.profileExtend,
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
                    type: "error"
                },
            });
    });

}

export default GetProfileUser;