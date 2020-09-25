import mockTerm from './data';

const dataTerm = {
    contentTerm: mockTerm,
    isLoading: false,
    
}


const TermReducer = (state = dataTerm, action) => {
    switch (action.type) {
        case 'UPDATE_TERM':
            const newTerm = action.data;
            /** api cap nhat noi dung dieu khoan */
                // newTerm: string
            /** end */
            state = { ...state, isLoading: !{...state}.isLoading }
            return state;

        default:
            return state
    }
}

export default TermReducer;