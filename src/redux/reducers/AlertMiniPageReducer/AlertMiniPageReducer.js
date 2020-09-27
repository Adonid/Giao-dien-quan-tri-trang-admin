
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

        default:
            return state
    }
}

export default AlertMiniPageReducer;