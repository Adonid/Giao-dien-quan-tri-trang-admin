import { 
    ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR, ADMIN_PROFILE,
    UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_ERROR, UPLOAD_AVATAR,
    ADMIN_DETAIL_SUCCESS, ADMIN_DETAIL_ERROR, ADMIN_DETAIL,
    DISTRICTS_BELONGTO_PROVINCE_SUCCESS, DISTRICTS_BELONGTO_PROVINCE_ERROR, DISTRICTS_BELONGTO_PROVINCE,
    COMMUNES_BELONGTO_DISTRICT_SUCCESS, COMMUNES_BELONGTO_DISTRICT_ERROR, COMMUNES_BELONGTO_DISTRICT,
    UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE,
 } from 'redux/constans';

const dataAdminProfile = {
    loadingProfile: true,
    loadingAvatar: false,
    loadingDetail: true,
    loadingUpdate: false,
    profileDetail: {
        phoneNumber: "",
        userName: "",
        email: "",
        address: {
            province: "",
            district: "",
            commune: "",
            street: ""
        }
    },
    provinces: [],
    districts: [{code: "000", name_with_type: "Quận/huyện"}],
    communes: [{code: "00000", name_with_type: "Phường/xã"}],
    enableProvince: true,
    enableDistrict: false,
    enableCommune: false,
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

            
        case ADMIN_DETAIL:
            return { ...state, loadingDetail: true };

        case ADMIN_DETAIL_SUCCESS:
            return { ...state, loadingDetail: false, profileDetail: action.payload.profileDetail, provinces: action.payload.provinces };

        case ADMIN_DETAIL_ERROR:
            return { ...state, loadingDetail: false, message: action.payload.message };

        
        case DISTRICTS_BELONGTO_PROVINCE:
            return { ...state, enableProvince: false, enableDistrict: false, enableCommune: false };

        case DISTRICTS_BELONGTO_PROVINCE_SUCCESS:
            return { ...state, enableProvince: true, enableDistrict: true, districts: action.payload.districts };

        case DISTRICTS_BELONGTO_PROVINCE_ERROR:
            return { ...state, message: action.payload.message };

        
        case COMMUNES_BELONGTO_DISTRICT:
            return { ...state, enableCommune: false };

        case COMMUNES_BELONGTO_DISTRICT_SUCCESS:
            return { ...state, enableCommune: true, communes: action.payload.communes };

        case COMMUNES_BELONGTO_DISTRICT_ERROR:
            return { ...state, message: action.payload.message };

        
        case UPDATE_PROFILE:
            return { ...state, loadingUpdate: true };

        case UPDATE_PROFILE_SUCCESS:
            return { ...state, loadingUpdate: false };

        case UPDATE_PROFILE_ERROR:
            return { ...state, loadingUpdate: false, message: action.payload.message };



        default:
            return state
    }
}



export default AdminProfileReducer;