import { LOGOUT_ADMIN } from 'redux/constans';

const Logout = () => async dispatch => {
    dispatch( {
        type: LOGOUT_ADMIN,
        payload: {
            message: "Đăng nhập để vào phiên làm việc mới!",
            logged: false,
        }
    });

}

export default Logout;