import { 
    CREATE_USER_SUCCESS, CREATE_USER_ERROR, CREATE_USER, OPEN_FORM_ADD_USER, CLOSE_FORM_ADD_USER,
    GET_ALL_USER_SUCCESS, GET_ALL_USER_ERROR, GET_ALL_USER,
 } from 'redux/constans';

const dataMannegerUser = {
    openForm: false,
    loadingCreate: false,
    messageCreate:"",

    users: [],
    loadingPage: true
}

const MannegerUserReducer = (state = dataMannegerUser, action) => {
    
    switch (action.type) {
        
        case OPEN_FORM_ADD_USER:
            return { ...state, openForm: true };
        
        case CLOSE_FORM_ADD_USER:
            return { ...state, openForm: false };

        case CREATE_USER:
            return { ...state, loadingCreate: true };

        case CREATE_USER_SUCCESS:
            return { ...state, loadingCreate: false, openForm: false };

        case CREATE_USER_ERROR:
            return { ...state, loadingCreate: false, messageCreate: action.payload.message };
        
        case GET_ALL_USER:
            return { ...state, loadingPage: true };

        case GET_ALL_USER_SUCCESS:
            return { ...state, loadingPage: false, users: action.payload.users };

        case GET_ALL_USER_ERROR:
            return { ...state, loadingPage: false };

        default:
            return state
    }
}



export default MannegerUserReducer;