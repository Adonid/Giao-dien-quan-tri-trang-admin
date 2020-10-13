import Axios from 'axios';

const dataAlertMiniPage = {
    signUpCompleted: {
        type    : "info",
        content : "Hello Word"
    },
    resetPasswordCompleted: {
        type    : "info",
        content : "Hello Word"
    },
    sigIn: {
        token: null,
        alert: {
            type    : "info",
            content : "Hello Word"
        },
    }
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
            /** api login nguoi dung */
                // userLogin: object { email: email, password: string }
            Axios({
                method: 'POST',
                baseURL: 'https://us-central1-nodejs-firebase-cloud-func.cloudfunctions.net/api/',
                url: '/authentication/login',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                data: userLogin
              }).then( res => {
                window.document.cookie = "__Sucure_user=" + res.data.token;
                // action.history.push('/dashboard');
                // tokenAdmin = res.data.token;
              }).catch( e => {
                window.alert("Email, mật khẩu không đúng hoặc không tồn tại hoặc đã bị xóa!");
              });
            /** end */
            state = { ...state, sigIn: {...state.sigIn, token: false, alert: { type: "success", content: "Đăng nhập thành công!" }}};
            console.log(state);
            return state;

        default:
            return state
    }
}



export default AlertMiniPageReducer;