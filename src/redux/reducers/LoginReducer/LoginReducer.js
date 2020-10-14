import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_ERROR } from "redux/constans";

const loginData = {
    enable: false,
    info: {}
}

const LoginReducer = (state = loginData, action) => {
    
    switch (action.type) {
        
        case LOGIN_ADMIN_SUCCESS:
            window.document.cookie = "__Sucure_user=" + action.payload.sucure;
            return { ...state, enable: action.payload.logged };
        
        case LOGIN_ADMIN_ERROR:
            window.document.cookie = "__Sucure_user=";
            return { ...state, enable: action.payload.logged };

        default:
            return state
    }
}



export default LoginReducer;