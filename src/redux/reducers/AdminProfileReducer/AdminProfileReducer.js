import { ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR } from 'redux/constans';

const dataAdminProfile = {
    profile: {},
    message: ""
}

const AdminProfileReducer = (state = dataAdminProfile, action) => {
    
    switch (action.type) {
        
        case ADMIN_PROFILE_SUCCESS:
            return { ...state, profile: action.payload.profile };

        case ADMIN_PROFILE_ERROR:
            return { ...state, profile: {}, message: action.payload.message };

        default:
            return state
    }
}



export default AdminProfileReducer;