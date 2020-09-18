import mockComments from './dataComment';

const dataPostDetail = {
    dataComments: mockComments,
}

const PostDetailReducer = (state = dataPostDetail, action) => {
    switch (action.type) {
        case 'FAVOURITE_COMMENT':
            
            return state;

        default:
            return state
    }
}

export default PostDetailReducer;