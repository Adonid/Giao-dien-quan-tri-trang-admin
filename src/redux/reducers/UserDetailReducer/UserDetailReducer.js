import MockUser from './data';

const dataUserDetail = {
    user: MockUser,
    alert: {
        type: "info",
        content: "Hello you"
    }
}


const UserDetailReducer = (state = dataUserDetail, action) => {
    switch (action.type) {
        case 'ACTION_SEND':
            const user = action.user;
            if(user.type!==2){
                // Day ra thong bao khong gui duoc email vi nguoi dung chua xac thuc email.
                if(!user.email.verify){
                    state = { ...state, alert: {...state.alert, type: "warning", content: `Không thể gửi email. ${user.name} chưa xác thực email cho tài khoản này!`}}
                    return state;
                }
                // end
                /** api thuc hien gui email */
                state = { ...state, alert: {...state.alert, type: "success", content: `Gửi email đến ${user.name} thành công!`}}
                return state;
                /** end */
            }
            else{
                /** api gui thong bao */
                state = { ...state, alert: {...state.alert, type: "success", content: `Gửi thông báo đến ${user.name} thành công!`}}
                return state;
                /** end */
            }
            break;
        case 'CLOSE_ACCOUNT':
            const userClose = action.user;
            /** api dong tai khoan user */

            /** end */
            // sau khi api dong xong. dua ra thong bao
            state = { ...state, alert: { ...state.alert, type: "info", content: `Tài khoản của ${userClose.name} đã bị đóng. Thông báo này sẽ đi kèm với email thông báo tới người dùng!`}}
            return state;
        default:
            return state
    }
}

export default UserDetailReducer;