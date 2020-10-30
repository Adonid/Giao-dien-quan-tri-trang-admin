import axios from 'common/Axios';
import { ADMIN_DETAIL_SUCCESS, ADMIN_DETAIL_ERROR, ADMIN_DETAIL } from 'redux/constans';
import { ReadCookie } from 'common';

const AdminDetail = () => async dispatch => {
    
    dispatch({type: ADMIN_DETAIL});

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
                    address{
                        province
                        district
                        commune
                        street
                    }
                }
                provinces{
                    name_with_type
                    code
                }
            }`,
            variables: {}
        }
        })
        .then( res => {
            dispatch( {
                type: ADMIN_DETAIL_SUCCESS,
                payload: {
                    profileDetail: res.data.data.adminDetail,
                    provinces: res.data.data.provinces
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: ADMIN_DETAIL_ERROR,
                payload: {
                    message: "Đã có lỗi xảy ra. status: 500",
                },
            });
        });
}

export default AdminDetail;