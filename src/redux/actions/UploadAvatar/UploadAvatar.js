import axios from 'common/Axios';
import { 
    CLOSE_DIALOG_UPLOAD_IMG,
    PROCESS_DIALOG_UPLOAD_IMG,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const UploadAvatar = dataUpload => async dispatch => {
    
    dispatch({type: CLOSE_DIALOG_UPLOAD_IMG});
    dispatch({
        type: PROCESS_DIALOG_UPLOAD_IMG,
        payload: {
            loading: true
        }
    });

    await axios({
        method: 'POST',
        url: 'admin/upload-avatar-writer',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: dataUpload
        })
        .then( res => {
            dispatch( {
                type: PROCESS_DIALOG_UPLOAD_IMG,
                payload: {
                    message: res.data.message,
                    loading: false
                }
            });
        })
        .catch( error => {
            if(error.response.data.exit){
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
            dispatch({
                type: PROCESS_DIALOG_UPLOAD_IMG,
                payload: {
                    loading: false
                }
            });
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "error"
                }
            });
        });

}

export default UploadAvatar;