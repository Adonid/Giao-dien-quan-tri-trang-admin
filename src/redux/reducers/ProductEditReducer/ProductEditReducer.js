import mockData from './data';

const dataPostEdit = {
    postInfo: mockData,
    editPostStatus : {
        isLoading: false,
        alert: {
            type    : "info",
            content : "Hello Word"
        },
    },
}

const ProductEditReducer = (state = dataPostEdit, action) => {
    switch (action.type) {
        case 'UPDATE_POST':
            const newDataPost = action.newDataPost;
            console.log(newDataPost);
            // setTimeout( () => {state = { ...state, editPostStatus: { ...state.editPostStatus, isLoading: ! { ...state.editPostStatus }.isLoading} }; console.log(newDataPost);}, 2000 );
            state = { ...state, editPostStatus: { ...state.editPostStatus, isLoading: ! { ...state.editPostStatus }.isLoading}};
            return state;

        default:
            return state
    }
}

export default ProductEditReducer;