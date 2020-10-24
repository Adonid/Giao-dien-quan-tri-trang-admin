import { ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR, ADMIN_PROFILE } from 'redux/constans';

const dataAdminProfile = {
    profile: {},
    loading: true,
    message: ""
}

const AdminProfileReducer = (state = dataAdminProfile, action) => {
    
    switch (action.type) {
        
        case ADMIN_PROFILE:
            return { ...state, loading: true };

        case ADMIN_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload.profile };

        case ADMIN_PROFILE_ERROR:
            return { ...state, loading: true, profile: {}, message: action.payload.message };

        default:
            return state
    }
}



export default AdminProfileReducer;