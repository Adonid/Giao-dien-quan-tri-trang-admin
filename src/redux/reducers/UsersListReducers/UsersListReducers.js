import mockData from './data';

const dataNewUser = {
    users: mockData,
    show: false,
    alert: {
        type    : "info",
        content : "Hello Word"
    },
}


const UsersListReducers = (state = dataNewUser, action) => {
    switch (action.type) {

        case 'SHOW_MODAL_ADD_USER':
            state = { ...state, show: true};
            return state;
        
        case 'CLOSE_MODAL_ADD_NEW_USER':
            state = { ...state, show: false};
            return state;

        case 'DELETE_SELECT_USERS':
            const selectedUsers = action.selectedUsers;
            /** api xoa het tat ca users */

            /** end */
            state = { ...state,  alert: {...state.alert, type: 'info', content: `Đã khóa xong ${ selectedUsers.length } người dùng ra khỏi hệ thống`} };
            return state;

        case 'ADD_NEW_USER':
            const dataUser = action.dataForm;
            /** api them moi user. chu ys co validate du lieu nen ket qua co the khac nhau */

            /** end */

            // Gia su la thanh cong
            // state = { ...state, show: false,  alert: {...state.alert, type: 'success', content: `Tạo tài khoản cho người dùng ${dataUser.userName} thành công`} };
            // Gia su la that bai
            state = { ...state,  alert: {...state.alert, type: 'error', content: `Lỗi email đăng ký không tồn tại hoặc đã đăng ký!`} };
            return state;
        
        default:
            return state
    }
}

export default UsersListReducers;