import axios from 'common/Axios';
import { COMMUNES_BELONGTO_DISTRICT_SUCCESS, COMMUNES_BELONGTO_DISTRICT_ERROR, COMMUNES_BELONGTO_DISTRICT,
     LOGOUT_ADMIN,
     MESSAGE_MINI
} from 'redux/constans';
import { ReadCookie } from 'common';

const CommunesBelongToDistrict = parentCode => async dispatch => {

    dispatch({type: COMMUNES_BELONGTO_DISTRICT});

    await axios({
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
                type: COMMUNES_BELONGTO_DISTRICT_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default CommunesBelongToDistrict;