import { 
    GET_PROFILE_USER, GET_PROFILE_USER_SUCCESS
 } from 'redux/constans';

const dataUserProfile = {
    profile: {},
    profileExtend: {},
    loading: true,
}

const UserProfileReducer = (state = dataUserProfile, action) => {
    
    switch (action.type) {
        
        case GET_PROFILE_USER:
            return { ...state, loading: true };

        
        case GET_PROFILE_USER_SUCCESS:
            return { ...state, loading: false, profile: action.payload.profile, profileExtend: payload.profileExtend };        
        
        default:
            return state
    }
}



export default UserProfileReducer;