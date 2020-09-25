
const dataAlertMiniPage = {}

const AlertMiniPageReducer = (state = dataAlertMiniPage, action) => {
    switch (action.type) {
        case 'SIGNUP_COMPLETED':
            const dataUserSignUp = action.data;
            console.log(dataUserSignUp);
            return state;

        default:
            return state
    }
}

export default AlertMiniPageReducer;