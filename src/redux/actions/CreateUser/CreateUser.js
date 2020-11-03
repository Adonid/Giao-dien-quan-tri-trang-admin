import axios from 'common/Axios';
import { CREATE_USER_SUCCESS, CREATE_USER_ERROR, CREATE_USER, MESSAGE_MAIN, LOGIN_ADMIN } from 'redux/constans';
import { ReadCookie } from 'common';

const CreateUser = dataUser => async dispatch => {
    
    dispatch({type: CREATE_USER});

    await axios({
        method: 'POST',
        url: 'admin/create-user',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: dataUser
        })
        .then( res => {
            dispatch( {type: CREATE_USER_SUCCESS});

            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: res.data.message,
                    type: "success"
                }
            });
        })
        .catch( error => {
            if(error.response.data.exit){
                dispatch( {
                    type: LOGOUT_ADMIN,
                    payload: {
                        message: error.response.data.message,
                        logged: false
                    },
                });
            }
            dispatch( {
                type: CREATE_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default CreateUser;