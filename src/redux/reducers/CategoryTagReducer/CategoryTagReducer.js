import mockCategory from './dataCat';
import mockTag from './dataTag';

const dataCategoryTag = {
    categorys: mockCategory,
    tags: mockTag,
}

const CategoryTagReducer = (state = dataCategoryTag, action) => {
    switch (action.type) {
        case 'ACTION_TYPE_1':
            return state;

        default:
            return state
    }
}

export default CategoryTagReducer;