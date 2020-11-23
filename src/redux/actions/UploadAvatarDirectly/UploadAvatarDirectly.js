import axios from 'common/Axios';
import { 
    CLOSE_DIALOG_UPLOAD_IMG,
    UPLOAD_AVATAR_DIRECTLY,
    UPLOAD_AVATAR_DIRECTLY_SUCCESS,
    UPLOAD_AVATAR_DIRECTLY_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const UploadAvatarDirectly = base64 => async dispatch => {
    
    dispatch({type: CLOSE_DIALOG_UPLOAD_IMG});
    dispatch({type: UPLOAD_AVATAR_DIRECTLY});

    await axios({
        method: 'POST',
        url: 'admin/upload-avatar-directly',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: base64
        })
        .then( res => {
            dispatch({
                type: UPLOAD_AVATAR_DIRECTLY_SUCCESS,
                payload: {
                    token: res.data.token
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
            dispatch({type: UPLOAD_AVATAR_DIRECTLY_ERROR});
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: res.data.message,
                    type: "warning"
                }
            });
        });

}

export default UploadAvatarDirectly;