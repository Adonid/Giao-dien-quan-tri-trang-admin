import axios from 'common/Axios';
import { GET_ALL_USER_SUCCESS, GET_ALL_USER_ERROR, GET_ALL_USER,
     LOGOUT_ADMIN,
     MESSAGE_MINI
} from 'redux/constans';
import { ReadCookie } from 'common';

const GetAllUsers = () => async dispatch => {
    
    dispatch({type: GET_ALL_USER});

    await axios({
        method: 'GET',
        url: 'admin/get-all-users',
        headers: { Authorization: "Bearer " + ReadCookie()},
        })
        .then( res => {
            dispatch( {
                type: GET_ALL_USER_SUCCESS,
                payload: {
                    users: res.data.users,
                }
            });
        })
        .catch( error => {
            if(error.response.data.exit){
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
                type: GET_ALL_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default GetAllUsers;