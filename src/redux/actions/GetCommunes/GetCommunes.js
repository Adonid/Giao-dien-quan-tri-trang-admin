import axios from 'common/Axios';
import { 
    GET_COMMUNES, GET_COMMUNES_SUCCESS, GET_COMMUNES_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const GetCommunes = code => async dispatch => {
    
    dispatch({type: GET_COMMUNES});

    await axios({
        method: 'POST',
        url: 'admin/get-communes',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {parentCode: code}
        })
        .then( res => {
            dispatch( {
                type: GET_COMMUNES_SUCCESS,
                payload: {
                    communes: res.data.communes,
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
            dispatch({type: GET_COMMUNES_ERROR});
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "error"
                },
            });
    });

}

export default GetCommunes;