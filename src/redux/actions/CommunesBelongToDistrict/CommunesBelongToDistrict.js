import axios from 'common/Axios';
import { COMMUNES_BELONGTO_DISTRICT_SUCCESS, COMMUNES_BELONGTO_DISTRICT_ERROR, COMMUNES_BELONGTO_DISTRICT } from 'redux/constans';
import { ReadCookie } from 'common';

const CommunesBelongToDistrict = parentCode => async dispatch => {

    dispatch({type: COMMUNES_BELONGTO_DISTRICT});

    const res = await axios({
        method: 'POST',
        url: 'admin/',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {
            query: `{
                communes: communesBelongToDistrict(parent_code: "${parentCode}"){
                    name_with_type
                    code
                }
            }`,
            variables: {}
        }
        })
        .then( res => {
            dispatch( {
                type: COMMUNES_BELONGTO_DISTRICT_SUCCESS,
                payload: {
                    communes: res.data.data.communes
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: COMMUNES_BELONGTO_DISTRICT_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default CommunesBelongToDistrict;