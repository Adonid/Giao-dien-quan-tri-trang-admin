import { 
    MESSAGE_MAIN,
 } from 'redux/constans';

const dataMessage = {
    mainMessage: {
        type    : "info",
        content : "Hello Word"
    },
}

const MessageReducer = (state = dataMessage, action) => {
    
    switch (action.type) {
        
        case MESSAGE_MAIN:
            return { ...state, mainMessage: { type: "success", content: action.payload.message } };

        default:
            return state
    }
}



export default MessageReducer;