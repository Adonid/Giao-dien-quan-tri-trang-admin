import axios from 'common/Axios';
import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_ERROR, LOGIN_ADMIN, MESSAGE_MAIN } from 'redux/constans';

const Login = userLogin => async dispatch => {
    
    dispatch({type: LOGIN_ADMIN});

    await axios({
        method: 'POST',
        url: 'authentication-admin/login',
        data: userLogin
        })
        .then( response => {
            dispatch( {
                type: LOGIN_ADMIN_SUCCESS,
                payload: {
                    sucure: response.data.token,
                    logged: true,
                    message: response
                }
            });
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: "Đăng nhập thành công, hãy bắt đầu phiên làm việc hiệu quả",
                    type: "success",
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: LOGIN_ADMIN_ERROR,
                payload: {
                    message: error.response.data.message,
                    logged: false,
                },
            });
        });
}

export default Login;