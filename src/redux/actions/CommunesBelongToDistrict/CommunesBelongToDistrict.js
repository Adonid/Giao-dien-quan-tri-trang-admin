import axios from 'common/Axios';
import { COMMUNES_BELONGTO_DISTRICT_SUCCESS, COMMUNES_BELONGTO_DISTRICT_ERROR, COMMUNES_BELONGTO_DISTRICT } from 'redux/constans';
import { ReadCookie } from 'common';

const CommunesBelongToDistrict = parentCode => async dispatch => {

    dispatch({type: COMMUNES_BELONGTO_DISTRICT});

    try{
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
            });
        dispatch( {
            type: COMMUNES_BELONGTO_DISTRICT_SUCCESS,
            payload: {
                communes: res.data.data.communes
            }
        });
    }
    catch(e){
        dispatch( {
            type: COMMUNES_BELONGTO_DISTRICT_ERROR,
            payload: {
                message: "Đã có lỗi xảy ra. status: 500",
            },
        });
    }

}

export default CommunesBelongToDistrict;