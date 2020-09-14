
const dataManipulationPost = {

}

const ManipulationPostReducer = (state = dataManipulationPost, action) => {
    switch (action.type) {
        case 'ACTION_TYPE_1':
            return state;

        default:
            return state
    }
}

export default ManipulationPostReducer;