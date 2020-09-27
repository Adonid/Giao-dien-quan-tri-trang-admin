
const dataAlertMiniPage = {
    signUpCompleted: {
        type    : "info",
        content : "Hello Word"
    },
    resetPasswordCompleted: {
        type    : "info",
        content : "Hello Word"
    },
}

const AlertMiniPageReducer = (state = dataAlertMiniPage, action) => {
    switch (action.type) {
        case 'SIGNUP_COMPLETED':
            const dataUserSignUp = action.data;
            const historySignUp = action.history;
            /** api tao moi account */
                // dataUserSignUp: object { email: string firstName: string password: string phoneNumber: number policy: bool }
            /** end */
            // vi du sau khi api
            historySignUp.push('/sign-in');
            state = { ...state, signUpCompleted: {type: "success", content: "Đăng ký thành công! Vui lòng xác thực tài khoản qua email đã gửi."}}
            return state;

        case 'ACTION_FORGET_PW':
            const email = action.email;
            const historyVerifyResetPw = action.history;
            /** api tao ma xac thuc va gui email chua code xac thuc */
                // email: email
            /** end */
            // vi du sau khi api
            historyVerifyResetPw.push('/reset-password');
            return state;

        
        case 'RESET_PASSWORD':
            const dataReset = action.data;
            const historyResetPw = action.history;
            /** api xac thuc code va thuc thi doi mat khau */
                // dataReset: object{ password: string, repassword: string, verifycode: string(8)}
            /** end */
            // vi du sau khi api
            historyResetPw.push('/sign-in');
            state = { ...state, resetPasswordCompleted: {type: "success", content: "Thay đổi mật khẩu thành công!"}}
            return state;

        case 'LOGIN':
            const userLogin = action.user;
            const historyLogin = action.history;
            /** api login nguoi dung */
                // userLogin: object { email: email, password: string }
            /** end */
            // vi du sa khi login
            return state;

        default:
            return state
    }
}

export default AlertMiniPageReducer;