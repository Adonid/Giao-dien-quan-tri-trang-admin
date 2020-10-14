import { LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_ERROR } from "redux/constans";

const loginData = {
    enable: false,
    info: {}
}

const AlertMiniPageReducer = (state = loginData, action) => {
    
    switch (action.type) {
        

        case LOGIN_ADMIN_SUCCESS:
            /** Cap nhat trang thai state */
                // action.payload - la ket qua duoc tra ve tu miiddleware thunk khi lay ket qua tu api
            /** end */
            // console.log(action.payload);
            return { ...state, info: action.payload };
        
        case LOGIN_ADMIN_ERROR:
            /** Cap nhat trang thai state */
                // action.payload - la ket qua duoc tra ve tu miiddleware thunk khi lay ket qua tu api
            /** end */
            // console.log(action.payload);
            return { ...state, info: action.payload };

        default:
            return state
    }
}



export default AlertMiniPageReducer;