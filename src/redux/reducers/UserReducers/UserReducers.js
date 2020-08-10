const dataNewUser = {
    show: false,
    alert: {
        type    : "info",
        content : "Hello Word"
    },
}


const UserReducers = (state = dataNewUser, action) => {
    switch (action.type) {

        case 'SHOW_MODAL_ADD_USER':
            state = { ...state, show: true};
            return state;
        
        case 'CLOSE_MODAL_ADD_NEW_USER':
            state = { ...state, show: false};
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

export default UserReducers;