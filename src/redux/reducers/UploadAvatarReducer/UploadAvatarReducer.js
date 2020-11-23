import { 
    UPLOAD_AVATAR_DIRECTLY, UPLOAD_AVATAR_DIRECTLY_SUCCESS, UPLOAD_AVATAR_DIRECTLY_ERROR,
 } from 'redux/constans';

const dataUploadAvatar = {
    loading: false,
    tokenAvatar: ""
}

const UploadAvatarReducer = (state = dataUploadAvatar, action) => {
    
    switch (action.type) {
        
        case UPLOAD_AVATAR_DIRECTLY:
            return { ...state, loading: true };

        case UPLOAD_AVATAR_DIRECTLY_SUCCESS:
            return { ...state, loading: false, tokenAvatar: action.payload.token };        
        
        case UPLOAD_AVATAR_DIRECTLY_ERROR:
            return { ...state, loading: false };        
        
        default:
            return state
    }
}



export default UploadAvatarReducer;