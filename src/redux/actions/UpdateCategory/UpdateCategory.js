import axios from 'common/Axios';
import { 
    UPDATE_CATEGORY, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_ERROR,
    CLOSE_DIALOG_UPLOAD_IMG,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const UpdateCategory = dataCategory => async dispatch => {

    dispatch({ type: UPDATE_CATEGORY});
    dispatch({type: CLOSE_DIALOG_UPLOAD_IMG});

    await axios({
        method: 'POST',
        url: 'admin/update-category',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: dataCategory
        })
        .then( res => {
            dispatch( {
                type: UPDATE_CATEGORY_SUCCESS,
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
            dispatch({ type: UPDATE_CATEGORY_ERROR});
        });

}

export default UpdateCategory;