import axios from 'common/Axios';
import { UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_ERROR, UPLOAD_AVATAR } from 'redux/constans';
import { ReadCookie } from 'common';

const UploadAvatar = base64 => async dispatch => {
    
    dispatch({type: UPLOAD_AVATAR});

    try{
        const res = await axios({
            method: 'POST',
            url: 'admin/upload-avatar',
            headers: { Authorization: "Bearer " + ReadCookie()},
            data: { base64: base64 }
            });
        dispatch( {
            type: UPLOAD_AVATAR_SUCCESS,
            payload: {
                message: res.data.message,
                avatarUrl: res.data.avatarUrl,
            }
        });
    }
    catch(e){
        dispatch( {
            type: UPLOAD_AVATAR_ERROR,
            payload: {
                message: "Đã có lỗi xảy ra. status: 500",
            },
        });
    }

}

export default UploadAvatar;