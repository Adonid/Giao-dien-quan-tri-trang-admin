import axios from 'common/Axios';
import { MESSAGE_MINI, FORGET_PASSWORD_ERROR, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD } from 'redux/constans';

const ForgetPassword = email => async dispatch => {
    
    dispatch({type: FORGET_PASSWORD});

    await axios({
        method: 'POST',
        url: 'authentication-admin/reset-password',
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: email
        })
        .then( res => {
            dispatch({type: FORGET_PASSWORD_SUCCESS});
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