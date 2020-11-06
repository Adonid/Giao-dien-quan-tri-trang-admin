import axios from 'common/Axios';
import { 
     LOGOUT_ADMIN,
     MESSAGE_MAIN,
     MESSAGE_MINI,
     GET_USER_EDIT,
     GET_USER_EDIT_SUCCESS,
     GET_USER_EDIT_ERROR,
} from 'redux/constans';
import { ReadCookie } from 'common';

const GetUserEdit = uid => async dispatch => {
    
    dispatch({type: GET_USER_EDIT});

    await axios({
        method: 'POST',
        url: 'admin/get-user-detail-to-edit',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: { uid: uid }
        })
        .then( res => {
            dispatch( {
                type: GET_USER_EDIT_SUCCESS,
                payload: {
                    account: res.data.account,
                    address: res.data.address,
                    provinces: res.data.provinces,
                }
            });
        })
        .catch( error => {
            if(typeof(error.response.data.exit) !== 'undefined'){
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
            dispatch({type: GET_USER_EDIT_ERROR});
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "error"
                }
            });
        });
}

export default GetUserEdit;