import mockTerm from './data';

const dataTerm = {
    contentTerm: mockTerm,
    isLoading: false,
    alert: {
        type: "info",
        content: "Hello you"
    }
}


const TermReducer = (state = dataTerm, action) => {
    switch (action.type) {
        case 'UPDATE_TERM':
            const newTerm = action.data;
            /** api cap nhat noi dung dieu khoan */
                // newTerm: string
            /** end */
            state = { ...state, isLoading: !{...state}.isLoading, alert: { ...state.alert, type: "info", content: "Cập nhật điều khoản sử dụng thành công!" } }
            return state;

        default:
            return state
    }
}

export default TermReducer;