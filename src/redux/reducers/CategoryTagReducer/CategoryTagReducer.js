import { 
    GET_CATEGORYS_TAGS, GET_CATEGORYS_TAGS_SUCCESS,
    CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR,
    DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_ERROR,
    UPDATE_CATEGORY, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_ERROR,
    CREATE_TAG, CREATE_TAG_SUCCESS, CREATE_TAG_ERROR,
    DELETE_TAG, DELETE_TAG_SUCCESS, DELETE_TAG_ERROR,
 } from 'redux/constans';

const dataCategoryTag = {
    loading: true,
    categorysList: [],
    loadingCreate: false,
    loadingEdit: false,
    tagsList: [],
    loadingCreateTag: false,
    loadingDelTag: false,

}

const CategoryTagReducer = (state = dataCategoryTag, action) => {
    switch (action.type) {

        case GET_CATEGORYS_TAGS:
            return {...state, loading: true };

        case GET_CATEGORYS_TAGS_SUCCESS:
            return {...state, loading: false, categorysList: action.payload.categorys, tagsList: action.payload.tags };

        case CREATE_CATEGORY:
            return {...state, loadingCreate: true };

        case CREATE_CATEGORY_SUCCESS:
            return {...state, loadingCreate: false, categorysList: action.payload.categorys };

        case CREATE_CATEGORY_ERROR:
            return {...state, loadingCreate: false };

        case DELETE_CATEGORY:
            return {...state, loadingEdit: true };

        case DELETE_CATEGORY_SUCCESS:
            return {...state, loadingEdit: false, categorysList: action.payload.categorys };

        case DELETE_CATEGORY_ERROR:
            return {...state, loadingEdit: false };

        case UPDATE_CATEGORY:
            return {...state, loadingEdit: true };

        case UPDATE_CATEGORY_SUCCESS:
            return {...state, loadingEdit: false, categorysList: action.payload.categorys };

        case UPDATE_CATEGORY_ERROR:
            return {...state, loadingEdit: false };

            
        case CREATE_TAG:
            return {...state, loadingCreateTag: true };

        case CREATE_TAG_SUCCESS:
            return {...state, loadingCreateTag: false, tagsList: action.payload.tags };

        case CREATE_TAG_ERROR:
            return {...state, loadingCreateTag: false };
        
        case DELETE_TAG:
            return {...state, loadingDelTag: true };

        case DELETE_TAG_SUCCESS:
            return {...state, loadingDelTag: false, tagsList: action.payload.tags };

        case DELETE_TAG_ERROR:
            return {...state, loadingDelTag: false };
        
        default:
            return state
    }
}

export default CategoryTagReducer;