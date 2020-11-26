import { 
    GET_NOTIFY_RULES, GET_NOTIFY_RULES_SUCCESS,
    UPDATE_NOTIFY_RULES, UPDATE_NOTIFY_RULES_SUCCESS, UPDATE_NOTIFY_RULES_ERROR,
    UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_ERROR,
 } from 'redux/constans';

const dataNotifyRules = {
    loading: true,
    loadingSaveNotify: false,
    loadingSavePassword: false,
    messagePassword: '',
    notifyRules: {}
}

const NotifyRulesReducer = (state = dataNotifyRules, action) => {
    
    switch (action.type) {
        
        case GET_NOTIFY_RULES:
            return { ...state, loading: true };
        
        case GET_NOTIFY_RULES_SUCCESS:
            return { ...state, loading: false, notifyRules: action.payload.notifyRules }

        case UPDATE_NOTIFY_RULES:
            return { ...state, loadingSaveNotify: true };
        
        case UPDATE_NOTIFY_RULES_SUCCESS:
            return { ...state, loadingSaveNotify: false }

        case UPDATE_NOTIFY_RULES_ERROR:
            return { ...state, loadingSaveNotify: false }
        
        case UPDATE_PASSWORD:
            return { ...state, loadingSavePassword: true };
        
        case UPDATE_PASSWORD_SUCCESS:
            return { ...state, loadingSavePassword: false, messagePassword: action.payload.message }

        case UPDATE_PASSWORD_ERROR:
            return { ...state, loadingSavePassword: false, messagePassword: action.payload.message }


        default:
            return state
    }
}



export default NotifyRulesReducer;