import axios from 'common/Axios';
import { DISTRICTS_BELONGTO_PROVINCE_SUCCESS, DISTRICTS_BELONGTO_PROVINCE_ERROR, DISTRICTS_BELONGTO_PROVINCE,
     LOGOUT_ADMIN,
     MESSAGE_MINI
} from 'redux/constans';
import { ReadCookie } from 'common';

const DistrictBelongToProvince = parentCode => async dispatch => {
    
    dispatch({type: DISTRICTS_BELONGTO_PROVINCE});

    await axios({
        method: 'POST',
        url: 'admin/',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {
            query: `{
                districts: districtsBelongToProvince(parent_code: "${parentCode}"){
                    name_with_type
                    code
                }
            }`,
            variables: {}
        }
        })
        .then( res => {
            dispatch( {
                type: DISTRICTS_BELONGTO_PROVINCE_SUCCESS,
                payload: {
                    districts: res.data.data.districts
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
            dispatch( {
                type: DISTRICTS_BELONGTO_PROVINCE_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default DistrictBelongToProvince;