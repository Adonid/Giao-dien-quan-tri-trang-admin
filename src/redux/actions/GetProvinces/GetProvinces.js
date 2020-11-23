import axios from 'common/Axios';
import { 
    GET_PROVINCES, GET_PROVINCES_SUCCESS, GET_PROVINCES_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const GetProfileUser = () => async dispatch => {
    
    dispatch({type: GET_PROVINCES});

    await axios({
        method: 'GET',
        url: 'admin/get-provinces',
        headers: { Authorization: "Bearer " + ReadCookie()},
        })
        .then( res => {
            dispatch( {
                type: GET_PROVINCES_SUCCESS,
                payload: {
                    provinces: res.data.provinces,
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
            dispatch({type: GET_PROVINCES_ERROR});
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