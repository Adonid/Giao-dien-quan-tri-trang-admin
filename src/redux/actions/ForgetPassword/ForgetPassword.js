import axios from 'common/Axios';
import { FORGER_PASSWORD_SUCCESS, FORGER_PASSWORD_ERROR, FORGER_PASSWORD } from 'redux/constans';

const ForgetPassword = email => async dispatch => {
    
    dispatch({type: FORGER_PASSWORD});

    try{
        const res = await axios({
            method: 'POST',
            url: 'authentication-admin/reset-password',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: email
            });
        dispatch( {
            type: FORGER_PASSWORD_SUCCESS,
            payload: {
                message: res.data.message,
            }
        });
    }
    catch(e){
        dispatch( {
            type: FORGER_PASSWORD_ERROR,
            payload: {
                message: e.message,
            },
        });
    }

}

export default ForgetPassword;