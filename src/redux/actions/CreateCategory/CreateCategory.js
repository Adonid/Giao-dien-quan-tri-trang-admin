import axios from 'common/Axios';
import { 
    CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const CreateCategory = category => async dispatch => {
    
    dispatch({type: CREATE_CATEGORY});

    await axios({
        method: 'POST',
        url: 'admin/create-category',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: category
        })
        .then( res => {
            dispatch( {
                type: CREATE_CATEGORY_SUCCESS,
                payload: {
                    message: '',
                }
            });
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: res.data.message,
                    type: "info"
                },
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
        });

}

export default CreateCategory;