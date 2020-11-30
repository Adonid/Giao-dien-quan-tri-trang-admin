import axios from 'common/Axios';
import { 
    CREATE_CATEGORY_SUCCESS,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const CreateCategory = category => async dispatch => {

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
        });

}

export default CreateCategory;