import axios from 'common/Axios';
import { 
    CREATE_TAG, CREATE_TAG_SUCCESS, CREATE_TAG_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const CreateTag = dataTag => async dispatch => {

    dispatch({ type: CREATE_TAG});

    await axios({
        method: 'POST',
        url: 'admin/create-tag',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: dataTag
        })
        .then( res => {
            dispatch( {
                type: CREATE_TAG_SUCCESS,
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
            dispatch({ type: CREATE_TAG_ERROR});
        });

}

export default CreateTag;