import axios from 'common/Axios';
import { UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_ERROR, UPLOAD_AVATAR } from 'redux/constans';
import { ReadCookie } from 'common';

const UploadAvatar = (base64, token) => async dispatch => {
    
    dispatch({type: UPLOAD_AVATAR});

    const res = await axios({
        method: 'POST',
        url: 'admin/upload-avatar',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: { base64: base64, token: token }
        })
        .then( res => {
            dispatch( {
                type: UPLOAD_AVATAR_SUCCESS,
                payload: {
                    message: res.data.message,
                    url: res.data.url,
                    token: res.data.token
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: UPLOAD_AVATAR_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });

}

export default UploadAvatar;