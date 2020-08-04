const dataSnackBar = {
    type    : "info",
    content : "Hello Word"
}

const SnackBarReducer = (state = dataSnackBar, actions) => {

    switch (actions.type) {
        // Thuc ra day phai goi API de luu lai feedback, sau do moi dua ra thong bao. day la vd sau khi da goi api xong
        case 'REPLY':
            const dataReader = actions.data;
            /** api reply o day */
             // ref, id, name
            /** end */
            // Neu call api success
            state = { ...state, type: "success", content: `Đã trả lời vào bình luận của ${dataReader.name} !` }
            // Neu call api fail
            // state = { ...state, type: "warning", content: `Đã có lỗi! Chưa trả lời được vào bình luận của ${dataReader.name} !` }
            return state

        default:
            return state
    }
}

export default SnackBarReducer;