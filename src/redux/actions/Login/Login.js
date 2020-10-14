import axios from 'axios';
import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_ERROR } from 'redux/constans';

const Login = (userLogin) => async dispatch => {

    try{
        const res = await axios({
            method: 'POST',
            baseURL: 'https://us-central1-nodejs-firebase-cloud-func.cloudfunctions.net/api/',
            url: '/authentication/login',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: userLogin
            });
        dispatch( {
            type: LOGIN_ADMIN_SUCCESS,
            payload: res.data
        });
    }
    catch(e){
        dispatch( {
            type: LOGIN_ADMIN_ERROR,
            payload: e,
        });
    }

}

export default Login;