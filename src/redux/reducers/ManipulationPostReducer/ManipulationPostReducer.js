
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
            console.log(dataNewPost);
            /** API them bai viet */

            /** end */
            // Tra ve trang thai 
            state = { ...state, createPost: { ...state.createPost, isLoading: !{...state.createPost}.isLoading, alert: { ...state.createPost.alert, type: "success", content: "Tạo bài viết thành công!"}} }
            return state;

        default:
            return state
    }
}

export default ManipulationPostReducer;