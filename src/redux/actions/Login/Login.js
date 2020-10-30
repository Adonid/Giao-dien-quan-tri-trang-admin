import axios from 'common/Axios';
import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_ERROR, LOGIN_ADMIN } from 'redux/constans';

const Login = userLogin => async dispatch => {
    
    dispatch({type: LOGIN_ADMIN});

    const res = await axios({
        method: 'POST',
        url: 'authentication-admin/login',
        data: userLogin
        })
        .then( res => {
            dispatch( {
                type: LOGIN_ADMIN_SUCCESS,
                payload: {
                    sucure: res.data.token,
                    logged: true,
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: LOGIN_ADMIN_ERROR,
                payload: {
                    message: "Email hoặc mật khẩu không đúng!",
                    logged: false,
                },
            });
        });
}

export default Login;