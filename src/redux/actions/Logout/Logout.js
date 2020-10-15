import axios from 'common/Axios';
import { LOGOUT_ADMIN } from 'redux/constans';

const Login = () => async dispatch => {
    
    try{
        const res = await axios({
            method: 'GET',
            url: 'logout',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            });
        dispatch( {
            type: LOGOUT_ADMIN,
            payload: {
                message: "Đăng nhập để vào phiên làm việc mới!",
                logged: false,
            }
        });
    }
    catch(e){
        dispatch( {
            type: LOGOUT_ADMIN,
            payload: {
                message: "Đã có lỗi xảy ra! status: 500",
                logged: true,
            },
        });
    }

}

export default Login;