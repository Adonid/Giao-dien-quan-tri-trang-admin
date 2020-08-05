import mockData from './data'

const dataNotify = {
    alert: {
        type    : "info",
        content : "Hello Word"
    },
    notifys: mockData
}

const SnackBarReducer = (state = dataNotify, actions) => {

    switch (actions.type) {
        // Thuc ra day phai goi API de luu lai feedback, sau do moi dua ra thong bao. day la vd sau khi da goi api xong
        case 'REPLY':
            const dataReader = actions.data;
            /** api reply o day */
             // ref, id, name
            /** end */
            // Neu call api success
            state = { ...state, alert: { ...state.alert, type: "success", content: `Đã trả lời vào bình luận của ${dataReader.name} !` } }
            // Neu call api fail
            // state = { ...state, alert: { ...state.alert, type: "warning", content: `Đã có lỗi! Chưa trả lời được vào bình luận của ${dataReader.name} !` } }
            return state

        case 'MARKALL':
            /** api danh dau tat ca la da doc */
            
            /** end */
            let newNotify = [...state.notifys];
            newNotify.map( els => els.items.map( item => item.isRead=true));
            state = { ...state, notifys: newNotify }
            return state;

        case 'DELETEALL':
            /** api xoa tat ca thong bao */
            
            /** end */
            state = { ...state, notifys: [] }
            return state;
        
        case 'DELETENOTE':
            /** api xoa 1 thong bao */
            
            /** end */
            const note = actions.note;

            let newNotifys = [...state.notifys];
            newNotifys.map( els => {
                if( els.ref===Number(note.ref) ){
                    els.items.map( item => {
                        if(item.id===Number(note.id)){
                            item.isDelete = true;
                        }
                    });
                }
            });
            state = { ...state, alert: { ...state.alert, type: "info", content: `Đã xóa 1 thông báo từ ${note.name} !` }, notifys: newNotifys }
            return state;
        
        case 'MARKNOTE':
            /** api danh dau 1 thong bao la da doc */
                // not.ref, not.id, not.isRead, not.name
            /** end */
            const not = actions.not;
            
            let newNotifyss = [...state.notifys];
            newNotifyss.map( els => {
                if( els.ref===Number(not.ref) ){
                    els.items.map( item => {
                        if(item.id===Number(not.id)){
                            item.isRead = not.isRead;
                        }
                    });
                }
            });
            state = { ...state, notifys: newNotifyss }
            return state;

        default:
            return state
    }
}

export default SnackBarReducer;