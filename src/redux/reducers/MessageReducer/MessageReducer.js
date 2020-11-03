import { 
    MESSAGE_MAIN, MESSAGE_MINI,
    OPEN_DIALOG_CONFIRM,
    CLOSE_DIALOG_CONFIRM,
    LOADING_CONFIRM
 } from 'redux/constans';

const dataMessage = {
    mainMessage: {
        type    : "info",
        content : "Hello Word"
    },
    miniMessage: {
        type    : "info",
        content : "Hello Word"
    },
    openConfirm: false,
    loadingConfirm: false,
    contentConfirm: {},
    dataConfirm: [],
}

const MessageReducer = (state = dataMessage, action) => {
    
    switch (action.type) {
        
        case MESSAGE_MAIN:
            return { ...state, mainMessage: { type: action.payload.type, content: action.payload.message } };

        case MESSAGE_MINI:
            return { ...state, miniMessage: { type: action.payload.type, content: action.payload.message } };

        case OPEN_DIALOG_CONFIRM:
            const data = action.dataConfirm;
            const content = action.contentConfirm;
            return { ...state, openConfirm: true, contentConfirm: content, dataConfirm: data };
        
        case LOADING_CONFIRM:
            return { ...state, loadingConfirm: true };
        
        case CLOSE_DIALOG_CONFIRM:
            return { ...state, openConfirm: false, loadingConfirm: false };

        default:
            return state
    }
}



export default MessageReducer;