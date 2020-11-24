import { 
    GET_MY_PROFILE, GET_MY_PROFILE_SUCCESS,
    UPDATE_MY_PROFILE_SUCCESS, UPDATE_MY_PROFILE_ERROR, UPDATE_MY_PROFILE, 
 } from 'redux/constans';

const dataMyProfile = {
    profile: {},
    profileExtend: {},
    loading: true,
    loadingButton: false,
}

const MyProfileReducer = (state = dataMyProfile, action) => {
    
    switch (action.type) {
        
        case GET_MY_PROFILE:
            return { ...state, loading: true };
        
        case GET_MY_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload.profile, profileExtend: action.payload.profileExtend };        
        
        case UPDATE_MY_PROFILE:
            return { ...state, loadingButton: true };
        
        case UPDATE_MY_PROFILE_SUCCESS:
            return { ...state, loadingButton: false };        
        
        case UPDATE_MY_PROFILE_ERROR:
            return { ...state, loadingButton: false };
            
        
        default:
            return state
    }
}



export default MyProfileReducer;