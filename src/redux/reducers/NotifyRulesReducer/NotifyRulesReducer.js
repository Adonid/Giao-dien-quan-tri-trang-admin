import { 
    GET_NOTIFY_RULES, GET_NOTIFY_RULES_SUCCESS,
    UPDATE_NOTIFY_RULES, UPDATE_NOTIFY_RULES_SUCCESS, UPDATE_NOTIFY_RULES_ERROR
 } from 'redux/constans';

const dataNotifyRules = {
    loading: true,
    loadingSaveNotify: false,
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


        default:
            return state
    }
}



export default NotifyRulesReducer;