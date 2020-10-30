import axios from 'common/Axios';
import { MESSAGE_MINI, FORGET_PASSWORD_ERROR, FORGET_PASSWORD } from 'redux/constans';

const ForgetPassword = email => async dispatch => {
    
    dispatch({type: FORGET_PASSWORD});

    const res = await axios({
        method: 'POST',
        url: 'authentication-admin/reset-password',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: email
        })
        .then( res => {
            dispatch( {
                type: MESSAGE_MINI,
                payload: {
                    message: res.data.message,
                    type: "success"
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: FORGET_PASSWORD_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default ForgetPassword;