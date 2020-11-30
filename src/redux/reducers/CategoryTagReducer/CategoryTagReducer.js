import { 
    GET_CATEGORYS_TAGS, GET_CATEGORYS_TAGS_SUCCESS,
    CREATE_CATEGORY, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR,
    DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_ERROR,
    UPDATE_CATEGORY, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_ERROR,
 } from 'redux/constans';
import mockCategory from './dataCat';
import mockTag from './dataTag';

const dataCategoryTag = {
    loading: true,
    categorys: mockCategory,
    tags: mockTag,

    categorysList: [],
    loadingCreate: false,
    loadingEdit: false,
    tagsList: [],

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

            
        case 'ADD_TAG':
            const nameTag = action.newTag;
            /** api them 1 tag */
                // nameTag: string
            /** end */
            // demo sau khi api xong
            state = {...state, tags: [...state.tags, { id: Math.floor(Math.random() * (99999 - 99)) + 99, label: nameTag, qtyProducts: 0 } ] };
            return state;

        
        case 'DELETE_TAG':
            const idTagDel = action.delTag;
            /** api xoa 1 tag */
                // idTagDel: int
            /** end */
            // demo sau khi api xong
            state = {...state, tags: [...state.tags].filter( tag => tag.id !== Number(idTagDel)) };
            return state;

        
        default:
            return state
    }
}

export default CategoryTagReducer;