import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_ERROR, LOGIN_ADMIN } from "redux/constans";

const loginData = {
    enable: false,
    loading: false,
    info: {}
}

const LoginReducer = (state = loginData, action) => {
    
    switch (action.type) {
        
        case LOGIN_ADMIN:
            return { ...state, loading: true };

        case LOGIN_ADMIN_SUCCESS:
            window.document.cookie = "__Sucure_user=" + action.payload.sucure;
            return { ...state, enable: action.payload.logged, loading: false };
        
        case LOGIN_ADMIN_ERROR:
            window.document.cookie = "__Sucure_user=";
            return { ...state, enable: action.payload.logged, loading: false };

        default:
            return state
    }
}



export default LoginReducer;