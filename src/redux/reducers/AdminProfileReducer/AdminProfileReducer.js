import { 
    ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR, ADMIN_PROFILE,
    UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_ERROR, UPLOAD_AVATAR,
 } from 'redux/constans';

const dataAdminProfile = {
    loadingProfile: true,
    loadingAvatar: false,
    avatarUrl: '',
    tokenAvatar: '',
    userName: '',
    message: "",


}

const AdminProfileReducer = (state = dataAdminProfile, action) => {
    
    switch (action.type) {
        
        case ADMIN_PROFILE:
            return { ...state, loadingProfile: true };

        case ADMIN_PROFILE_SUCCESS:
            return { ...state, loadingProfile: false, avatarUrl: action.payload.profile.avatar.url, tokenAvatar: action.payload.profile.avatar.token, userName: action.payload.profile.userName };

        case ADMIN_PROFILE_ERROR:
            return { ...state, loadingProfile: true, message: action.payload.message };

        case UPLOAD_AVATAR:
            return { ...state, loadingAvatar: true };

        case UPLOAD_AVATAR_SUCCESS:
            return { ...state, loadingAvatar: false, message: action.payload.message, avatarUrl: action.payload.url, tokenAvatar: action.payload.token };

        case UPLOAD_AVATAR_ERROR:
            return { ...state, loadingAvatar: false, message: action.payload.message };

        default:
            return state
    }
}



export default AdminProfileReducer;