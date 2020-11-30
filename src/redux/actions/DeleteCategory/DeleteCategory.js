import axios from 'common/Axios';
import { 
    DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const DeleteCategory = id => async dispatch => {

    dispatch({ type: DELETE_CATEGORY});

    await axios({
        method: 'POST',
        url: 'admin/delete-category',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {id}
        })
        .then( res => {
            dispatch( {
                type: DELETE_CATEGORY_SUCCESS,
                payload: {
                    categorys: res.data.categorys,
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
            dispatch({ type: DELETE_CATEGORY_ERROR});
        });

}

export default DeleteCategory;