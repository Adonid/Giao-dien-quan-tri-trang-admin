const dataUser = {
    show: false
}


const UserReducers = (state = dataUser, action) => {
    switch (action.type) {

        case 'SHOW_MODAL_ADD_USER':
            state = { ...state, show: !state.show};
            return state;

        
        default:
            return state
    }
}

export default UserReducers;