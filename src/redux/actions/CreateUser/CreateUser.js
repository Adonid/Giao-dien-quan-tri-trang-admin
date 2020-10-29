import axios from 'common/Axios';
import { CREATE_USER_SUCCESS, CREATE_USER_ERROR, CREATE_USER } from 'redux/constans';
import { ReadCookie } from 'common';

const CreateUser = dataUser => async dispatch => {
    
    dispatch({type: CREATE_USER});

    try{
        const res = await axios({
            method: 'POST',
            url: 'admin/create-user',
            headers: { Authorization: "Bearer " + ReadCookie()},
            data: dataUser
            });
        dispatch( {
            type: CREATE_USER_SUCCESS,
            payload: {
                sucure: res.data.token,
                logged: true,
            }
        });
    }
    catch(e){
        dispatch( {
            type: CREATE_USER_ERROR,
            payload: {
                message: "Email hoặc mật khẩu không đúng!",
                logged: false,
            },
        });
    }

}

export default CreateUser;