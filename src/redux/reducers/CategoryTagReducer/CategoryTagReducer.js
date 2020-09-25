import mockCategory from './dataCat';
import mockTag from './dataTag';

const dataCategoryTag = {
    categorys: mockCategory,
    tags: mockTag,
}

const CategoryTagReducer = (state = dataCategoryTag, action) => {
    switch (action.type) {
        case 'ADD_NEW_CAT':
            const nameCat = action.name;
            /** api them moi 1 category */

            /** end */
            // demo sau khi api xong
            state = {...state, categorys: [...state.categorys, { id: Math.floor(Math.random() * (99999 - 99)) + 99, label: nameCat, qtyProducts: 0 }]};
            return state;
        
        case 'DELETE_CAT':
            const idCatDel = action.idCat;
            /** api xoa 1 category */
                // chu y dua so luong bai viet thuoc danh muc nay ve danh muc mac dinh truoc khi xoa
            /** end */
            // demo sau khi api xong
            state = {...state, categorys: [...state.categorys].filter( cat => cat.id !== idCatDel ) };
            return state;

        
        case 'UPDATE_CAT':
            const dataUpdateCat = action.dataCatUpdate;
            /** api sua 1 category */
                // dataUpdateCat: object { id: int, label: string, avatar: string }
                // Chu y kiem tra avarta: neu la base64 thi phai luu anh, neu la url anh thi chi can luu lai, neu rong thi luu rong
            /** end */
            // demo sau khi api xong
            state = {...state, categorys: [...state.categorys].map( cat => cat.id===dataUpdateCat.id ? dataUpdateCat : cat) };
            return state;

        
        default:
            return state
    }
}

export default CategoryTagReducer;