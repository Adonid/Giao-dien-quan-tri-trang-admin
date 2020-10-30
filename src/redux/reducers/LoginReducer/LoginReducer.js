import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_ERROR, LOGIN_ADMIN, LOGOUT_ADMIN } from "redux/constans";

const loginData = {
    enable: false,
    loading: false,
    message: ""
}

const LoginReducer = (state = loginData, action) => {
    
    switch (action.type) {
        
        case LOGIN_ADMIN:
            return { ...state, loading: true };

        case LOGIN_ADMIN_SUCCESS:
            console.log(action.payload.message);
            window.document.cookie = "__Sucure_user=" + action.payload.sucure + ";expires=" + new Date( (new Date()).setDate((new Date()).getDate() + 0.5) ).toString();
            return { ...state, enable: action.payload.logged, loading: false, message: "" };
        
        case LOGIN_ADMIN_ERROR:
            window.document.cookie = "__Sucure_user=";
            return { ...state, enable: action.payload.logged, loading: false, message: action.payload.message };

        /** 
         *  Truong hop logout nay dung trong: 
         *  1. Nguoi dung bam vao logout
         *  2. Khi thong tin headers gui len server bi sai va tra ve loi thi cung dua ve trang thai logout
         *  */ 
        case LOGOUT_ADMIN:
            window.document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            return { ...state, enable: action.payload.logged, info: action.payload.message, };

        default:
            return state
    }
}



export default LoginReducer;