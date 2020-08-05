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
            console.log('da mark all');
            return state;

        case 'DELETEALL':
            /** api xoa tat ca thong bao */
            
            /** end */
            console.log('da xoa het thong bao');
            return state;
        
        case 'DELETENOTE':
            /** api xoa 1 thong bao */
            
            /** end */
            const note = actions.note;
            state = { ...state, alert: { ...state.alert, type: "info", content: `Đã xóa 1 thông báo từ ${note.name} !` } }
            return state;
        
        case 'MARKNOTE':
            /** api danh dau 1 thong bao la da doc */
            
            /** end */
            const not = actions.not;
            console.log(not);
            return state;

        default:
            return state
    }
}

export default SnackBarReducer;