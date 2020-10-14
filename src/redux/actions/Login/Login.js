import axios from 'axios'
import { LOGIN_ADMIN, LOGIN_ADMIN_ERROR } from 'redux/constans'

export const login = () => async dispatch => {
    
    try{
        const res = await axios({
            method: 'POST',
            baseURL: 'https://us-central1-nodejs-firebase-cloud-func.cloudfunctions.net/api/',
            url: '/authentication/login',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: userLogin
            });
        dispatch( {
            type: LOGIN_ADMIN,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: LOGIN_ADMIN_ERROR,
            payload: e,
        })
    }

}