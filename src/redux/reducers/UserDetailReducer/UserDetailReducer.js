import MockUser from './data';

const dataUserDetail = {
    user: MockUser
}


const UserDetailReducer = (state = dataUserDetail, action) => {
    switch (action.type) {
        case 'ACTION_TYPE_1':
            return state


        default:
            return state
    }
}

export default UserDetailReducer;