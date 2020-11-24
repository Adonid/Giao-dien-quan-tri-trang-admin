import { 
    GET_PROVINCES, GET_PROVINCES_SUCCESS, GET_PROVINCES_ERROR,
    GET_DISTRICTS, GET_DISTRICTS_SUCCESS, GET_DISTRICTS_ERROR,
    GET_COMMUNES, GET_COMMUNES_SUCCESS, GET_COMMUNES_ERROR,
 } from 'redux/constans';

const dataAddress = {
    provincesLoading: false,
    provinces: [],
    districtsLoading: true,
    districts: [],
    communesLoading: true,
    communes: [],
    streetLoading: true,
}

const AddressReducer = (state = dataAddress, action) => {
    
    switch (action.type) {
        
        case GET_PROVINCES:
            return { ...state, provincesLoading: true, districtsLoading: true, communesLoading: true, streetLoading: true };
        
        case GET_PROVINCES_SUCCESS:
            return { ...state, provincesLoading: false, provinces: action.payload.provinces };

        case GET_PROVINCES_ERROR:
            return { ...state, provincesLoading: false };

            
        case GET_DISTRICTS:
            return { ...state, districtsLoading: true, communesLoading: true, streetLoading: true };
        
        case GET_DISTRICTS_SUCCESS:
            return { ...state, districtsLoading: false, districts: action.payload.districts };

        case GET_DISTRICTS_ERROR:
            return { ...state, districtsLoading: false };

        case GET_COMMUNES:
            return { ...state, communesLoading: true, streetLoading: true };
        
        case GET_COMMUNES_SUCCESS:
            return { ...state, communesLoading: false, streetLoading: false, communes: action.payload.communes };

        case GET_COMMUNES_ERROR:
            return { ...state, communesLoading: false };


        default:
            return state
    }
}



export default AddressReducer;