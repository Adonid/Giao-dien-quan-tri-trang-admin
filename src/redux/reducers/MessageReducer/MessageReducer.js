import { 
    MESSAGE_MAIN, MESSAGE_MINI,
    OPEN_DIALOG_CONFIRM,
    CLOSE_DIALOG_CONFIRM,
    LOADING_CONFIRM,
    OPEN_DIALOG_UPLOAD_IMG,
    CLOSE_DIALOG_UPLOAD_IMG,
    PROCESS_DIALOG_UPLOAD_IMG,
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

    openUploadImg: false,
    loadingUpload: false,
    contentUploadImg: {
        imageInit:'',
        titleName:''
    },
}

const MessageReducer = (state = dataMessage, action) => {
    
    switch (action.type) {
        // Mo thong bao giao dien chinh
        case MESSAGE_MAIN:
            return { ...state, mainMessage: { type: action.payload.type, content: action.payload.message } };
        // Mo thong bao giao dien phu
        case MESSAGE_MINI:
            return { ...state, miniMessage: { type: action.payload.type, content: action.payload.message } };
        // Mo cua so xac nhan
        case OPEN_DIALOG_CONFIRM:
            return { ...state, openConfirm: true, contentConfirm: action.contentConfirm, dataConfirm: action.dataConfirm };
        // Trang thai loading xac nhan
        case LOADING_CONFIRM:
            return { ...state, loadingConfirm: true };
        // Dong cua so xac nhan
        case CLOSE_DIALOG_CONFIRM:
            return { ...state, openConfirm: false, loadingConfirm: false };
        // Mo cua so upload anh
        case OPEN_DIALOG_UPLOAD_IMG:
            const contentUpload = action.content
            return { ...state, openUploadImg: true, contentUploadImg: contentUpload };
        // Xu ly upload anh
        case PROCESS_DIALOG_UPLOAD_IMG:
            return { ...state, loadingUpload: action.payload.loading };
        // Dong cua so upload anh
        case CLOSE_DIALOG_UPLOAD_IMG:
            return { ...state, openUploadImg: false };

        default:
            return state
    }
}



export default MessageReducer;