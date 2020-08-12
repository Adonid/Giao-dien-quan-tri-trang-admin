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
                // Day ra thong bao khong gui duoc thong bao vi account dang bi dong.
                if(user.isClosed){
                    state = { ...state, alert: {...state.alert, type: "warning", content: `Không thể gửi thông báo. Tài khoản của ${user.name} đang bị đóng!`}}
                    return state;
                }
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
            state = { ...state, user: { ...state.user, userinfo: { ...state.user.userinfo, isClosed: true}}, alert: { ...state.alert, type: "info", content: `Tài khoản của ${userClose.name} đã bị đóng. Thông báo này sẽ đi kèm với email thông báo tới người dùng!`}}
            return state;
        case 'OPEN_ACCOUNT':
            const userOpen = action.user;
            /** api mo tai khoan user */

            /** end */
            // sau khi api mo xong. dua ra thong bao
            state = { ...state, user: { ...state.user, userinfo: { ...state.user.userinfo, isClosed: false}} , alert: { ...state.alert, type: "info", content: `Mở khóa cho tài khoản ${userOpen.name} thành công. Thông báo này sẽ đi kèm với email thông báo tới người dùng!`}}
            return state;
        case 'DISTROY_ACCOUNT':
            const userDistroy = action.user;
            /** api xoa tai khoan user */

            /** end */
            // sau khi api xoa xong. dua ra thong bao . Quay tro ve danh sach nguoi dung
            state = { ...state, alert: { ...state.alert, type: "info", content: `Tài khoản của ${userDistroy.name} đã bị xóa khỏi hệ thống. Thông báo này sẽ đi kèm với email thông báo!`}}
            return state;
        default:
            return state
    }
}

export default UserDetailReducer;