
const dataManipulationPost = {
    createPost : {
        isLoading: false,
        alert: {
            type    : "info",
            content : "Hello Word"
        },
    }
}

const ManipulationPostReducer = (state = dataManipulationPost, action) => {
    switch (action.type) {
        case 'CREATE_NEW_POST':
            const dataNewPost = action.data;
            state = { ...state, createPost: { ...state.createPost, isLoading: !{...state.createPost}.isLoading} }
            return state;

        default:
            return state
    }
}

export default ManipulationPostReducer;