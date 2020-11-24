import axios from 'common/Axios';
import { 
    GET_DISTRICTS, GET_DISTRICTS_SUCCESS, GET_DISTRICTS_ERROR,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';

const GetDistricts = code => async dispatch => {
    
    dispatch({type: GET_DISTRICTS});

    await axios({
        method: 'POST',
        url: 'admin/get-districts',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {parentCode: code}
        })
        .then( res => {
            dispatch( {
                type: GET_DISTRICTS_SUCCESS,
                payload: {
                    districts: res.data.districts,
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
            dispatch({type: GET_DISTRICTS_ERROR});
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "error"
                },
            });
    });

}

export default GetDistricts;