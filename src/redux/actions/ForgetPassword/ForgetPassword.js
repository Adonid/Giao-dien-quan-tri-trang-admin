import axios from 'common/Axios';
import { FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_ERROR, FORGET_PASSWORD } from 'redux/constans';

const ForgetPassword = email => async dispatch => {
    
    dispatch({type: FORGET_PASSWORD});

    try{
        const res = await axios({
            method: 'POST',
            url: 'authentication-admin/reset-password',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: email
            });
        dispatch( {
            type: FORGET_PASSWORD_SUCCESS,
            payload: {
                message: res.data.message,
            }
        });
    }
    catch(e){
        dispatch( {
            type: FORGET_PASSWORD_ERROR,
            payload: {
                message: e.message,
            },
        });
    }

}

export default ForgetPassword;