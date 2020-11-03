import axios from 'common/Axios';
import { ADMIN_DETAIL_SUCCESS, ADMIN_DETAIL_ERROR, ADMIN_DETAIL,
     LOGOUT_ADMIN,
     MESSAGE_MINI
} from 'redux/constans';
import { ReadCookie } from 'common';

const AdminDetail = () => async dispatch => {
    
    dispatch({type: ADMIN_DETAIL});

    await axios({
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
            dispatch( {
                type: ADMIN_DETAIL_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default AdminDetail;