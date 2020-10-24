import { 
    ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR, ADMIN_PROFILE,
    UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_ERROR, UPLOAD_AVATAR,
 } from 'redux/constans';

const dataAdminProfile = {
    profile: {},
    loading: true,
    loadingAvatar: false,
    message: "",
}

const AdminProfileReducer = (state = dataAdminProfile, action) => {
    
    switch (action.type) {
        
        case ADMIN_PROFILE:
            return { ...state, loading: true };

        case ADMIN_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload.profile };

        case ADMIN_PROFILE_ERROR:
            return { ...state, loading: true, message: action.payload.message };

        case UPLOAD_AVATAR:
            return { ...state, loadingAvatar: true };

        case UPLOAD_AVATAR_SUCCESS:
            return { ...state, loadingAvatar: false, message: action.payload.message, profile: {...state.profile, avatarUrl: action.payload.avatarUrl } };

        case UPLOAD_AVATAR_ERROR:
            return { ...state, loadingAvatar: false, message: action.payload.message };

        default:
            return state
    }
}



export default AdminProfileReducer;