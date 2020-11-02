import axios from 'common/Axios';
import { GET_ALL_USER_SUCCESS, GET_ALL_USER_ERROR, GET_ALL_USER } from 'redux/constans';
import { ReadCookie } from 'common';

const GetAllUsers = () => async dispatch => {
    
    dispatch({type: GET_ALL_USER});

    await axios({
        method: 'GET',
        url: 'admin/get-all-users',
        headers: { Authorization: "Bearer " + ReadCookie()},
        })
        .then( res => {
            dispatch( {
                type: GET_ALL_USER_SUCCESS,
                payload: {
                    users: res.data.users,
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: GET_ALL_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                },
            });
        });
}

export default GetAllUsers;