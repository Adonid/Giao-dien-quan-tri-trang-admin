import axios from 'common/Axios';
import { DISTRICTS_BELONGTO_PROVINCE_SUCCESS, DISTRICTS_BELONGTO_PROVINCE_ERROR, DISTRICTS_BELONGTO_PROVINCE } from 'redux/constans';
import { ReadCookie } from 'common';

const DistrictBelongToProvince = parentCode => async dispatch => {
    
    dispatch({type: DISTRICTS_BELONGTO_PROVINCE});

    const res = await axios({
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
            dispatch( {
                type: DISTRICTS_BELONGTO_PROVINCE_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default DistrictBelongToProvince;