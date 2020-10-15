import { LOGOUT_ADMIN } from "redux/constans";

const logoutData = {
    message:"",
    logged: true,
}

const LoginReducer = (state = loginData, action) => {
    
    switch (action.type) {

        case LOGOUT_ADMIN:
            window.document.cookie = "__Sucure_user=";
            return { ...state, message: payload.message, logged: payload.logged, };

        default:
            return state
    }
}



export default LoginReducer;