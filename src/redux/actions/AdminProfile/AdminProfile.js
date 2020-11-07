import axios from 'common/Axios';
import { ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR, ADMIN_PROFILE,
     LOGOUT_ADMIN,
     MESSAGE_MINI
} from 'redux/constans';
import { ReadCookie } from 'common';

const AdminProfile = () => async dispatch => {
    
    dispatch({type: ADMIN_PROFILE});

    await axios({
        method: 'POST',
        url: 'admin/',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {
            query: `{
                adminProfile{
                    userName
                    avatar{
                        url
                        token
                    }
                }
            }`,
            variables: {}
        }
        })
        .then( res => {
            dispatch( {
                type: ADMIN_PROFILE_SUCCESS,
                payload: {
                    profile: res.data.data.adminProfile,
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
                type: ADMIN_PROFILE_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
    });

}

export default AdminProfile;