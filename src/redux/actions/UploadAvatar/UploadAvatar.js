import axios from 'common/Axios';
import { UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_ERROR, UPLOAD_AVATAR } from 'redux/constans';
import { ReadCookie } from 'common';

const UploadAvatar = () => async dispatch => {
    
    dispatch({type: UPLOAD_AVATAR});

    try{
        const res = await axios({
            method: 'POST',
            url: 'admin/',
            headers: { Authorization: "Bearer " + ReadCookie()},
            data: {
                query: `{
                    adminProfile{
                        userName
                        avatarUrl
                    }
                }`,
                variables: {}
            }
            });
        dispatch( {
            type: UPLOAD_AVATAR_SUCCESS,
            payload: {
                profile: res.data.data.adminProfile[0],
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