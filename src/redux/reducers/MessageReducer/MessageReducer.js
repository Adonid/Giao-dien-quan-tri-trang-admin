import { 
    MESSAGE_MAIN, MESSAGE_MINI
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
}

const MessageReducer = (state = dataMessage, action) => {
    
    switch (action.type) {
        
        case MESSAGE_MAIN:
            return { ...state, mainMessage: { type: action.payload.type, content: action.payload.message } };

        case MESSAGE_MINI:
            return { ...state, miniMessage: { type: action.payload.type, content: action.payload.message } };

        default:
            return state
    }
}



export default MessageReducer;