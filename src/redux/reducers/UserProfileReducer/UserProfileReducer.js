import { 
    USER_PROFILE, USER_PROFILE_SUCCESS, USER_PROFILE_ERROR
 } from 'redux/constans';

const dataUserProfile = {
    profile: {},
    loading: true,
}

const UserProfileReducer = (state = dataUserProfile, action) => {
    
    switch (action.type) {
        
        case USER_PROFILE:
            return { ...state, loading: true };

        
        case USER_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload.profile };

        
        case USER_PROFILE_ERROR:
            return { ...state, loading: true };

        
        
        default:
            return state
    }
}



export default UserProfileReducer;