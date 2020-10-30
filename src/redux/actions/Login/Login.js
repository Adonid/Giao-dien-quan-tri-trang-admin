import axios from 'common/Axios';
import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_ERROR, LOGIN_ADMIN } from 'redux/constans';

const Login = userLogin => async dispatch => {
    
    dispatch({type: LOGIN_ADMIN});

    const res = await axios({
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