import { LOGOUT_ADMIN } from "redux/constans";

const logoutData = {
    message:"",
    logged: true,
}

const LoginReducer = (state = logoutData, action) => {
    
    switch (action.type) {

        case LOGOUT_ADMIN:
            window.document.cookie = '';
            return { ...state, message: action.payload.message, logged: action.payload.logged, };

        default:
            return state
    }
}



export default LoginReducer;