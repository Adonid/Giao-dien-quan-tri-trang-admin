import axios from 'common/Axios';
import { ADMIN_DETAIL_SUCCESS, ADMIN_DETAIL_ERROR, ADMIN_DETAIL } from 'redux/constans';
import { ReadCookie } from 'common';

const AdminDetail = () => async dispatch => {
    
    dispatch({type: ADMIN_DETAIL});

    try{
        const res = await axios({
            method: 'POST',
            url: 'admin/',
            headers: { Authorization: "Bearer " + ReadCookie()},
            data: {
                query: `{
                    adminDetail: adminProfile{
                        userName
                        phoneNumber
                        email
                    }
                }`,
                variables: {}
            }
            });
        dispatch( {
            type: ADMIN_DETAIL_SUCCESS,
            payload: {
                profileDetail: res.data.data.adminDetail,
            }
        });
    }
    catch(e){
        dispatch( {
            type: ADMIN_DETAIL_ERROR,
            payload: {
                message: "Đã có lỗi xảy ra. status: 500",
            },
        });
    }

}

export default AdminDetail;