import { FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_ERROR, FORGET_PASSWORD } from "redux/constans";

const dataResetPassword = {
    loading: false,
    messege: false,
}

const LoginReducer = (state = dataResetPassword, action) => {
    
    switch (action.type) {
        
        case FORGET_PASSWORD:
            return { ...state, loading: true };

        case FORGET_PASSWORD_SUCCESS:
            return { ...state, message: action.payload.message, loading: false };
        
        case FORGET_PASSWORD_ERROR:
            return { ...state, message: action.payload.message, loading: false };

        default:
            return state
    }
}



export default LoginReducer;