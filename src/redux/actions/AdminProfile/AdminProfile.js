import axios from 'common/Axios';
import { ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR } from 'redux/constans';

const AdminProfile = () => async dispatch => {
    
    try{
        const res = await axios({
            method: 'GET',
            url: 'admin/profile',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            });
        dispatch( {
            type: ADMIN_PROFILE_SUCCESS,
            payload: {
                profile: res.data.profile,
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