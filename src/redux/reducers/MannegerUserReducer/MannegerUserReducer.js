import { 
    CREATE_USER_SUCCESS, CREATE_USER_ERROR, CREATE_USER, OPEN_FORM_ADD_USER, CLOSE_FORM_ADD_USER,
 } from 'redux/constans';

const dataMannegerUser = {
    openForm: false,
}

const MannegerUserReducer = (state = dataMannegerUser, action) => {
    
    switch (action.type) {
        
        case OPEN_FORM_ADD_USER:
            return { ...state, openForm: true };
        
        case CLOSE_FORM_ADD_USER:
            return { ...state, openForm: false };

        case CREATE_USER:
            return { ...state, loadingProfile: true };

        case CREATE_USER_SUCCESS:
            return { ...state, loadingProfile: false, avatarUrl: action.payload.profile.avatar.url, tokenAvatar: action.payload.profile.avatar.token, userName: action.payload.profile.userName };

        case CREATE_USER_ERROR:
            return { ...state, loadingProfile: true, message: action.payload.message };

        default:
            return state
    }
}



export default MannegerUserReducer;