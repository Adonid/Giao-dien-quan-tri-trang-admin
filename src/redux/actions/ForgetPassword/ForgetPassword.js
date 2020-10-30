import axios from 'common/Axios';
import { FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_ERROR, FORGET_PASSWORD } from 'redux/constans';

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
                type: FORGET_PASSWORD_SUCCESS,
                payload: {
                    message: res.data.message,
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: FORGET_PASSWORD_ERROR,
                payload: {
                    message: "Email không tồn tại hoặc chưa đăng ký!",
                },
            });
        });
}

export default ForgetPassword;