import axios from 'common/Axios';
import { ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR } from 'redux/constans';

const AdminProfile = () => async dispatch => {
    
    try{
        const res = await axios({
            method: 'POST',
            url: 'admin/',
            data: {
                query: `{
                    adminProfile{
                        userName
                        avatarUrl
                    }
                }`
            }
            });
        dispatch( {
            type: ADMIN_PROFILE_SUCCESS,
            payload: {
                profile: res.data.adminProfile[0],
            }
        });
    }
    catch(e){
        dispatch( {
            type: ADMIN_PROFILE_ERROR,
            payload: {
                message: "Đã có lỗi xảy ra. status: 500",
            },
        });
    }

}

export default AdminProfile;