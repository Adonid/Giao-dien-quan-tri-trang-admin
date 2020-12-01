import axios from 'common/Axios';
import { 
    DELETE_TAG, DELETE_TAG_SUCCESS, DELETE_TAG_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const DeleteTag = id => async dispatch => {

    dispatch({ type: DELETE_TAG});

    await axios({
        method: 'POST',
        url: 'admin/delete-tag',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {id}
        })
        .then( res => {
            dispatch( {
                type: DELETE_TAG_SUCCESS,
                payload: {
                    tags: res.data.tags,
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
                    type: "warning"
                },
            });
            dispatch({ type: DELETE_TAG_ERROR});
        });

}

export default DeleteTag;