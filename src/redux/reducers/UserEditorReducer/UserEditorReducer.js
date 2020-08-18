import mockData from './data';

const dataUserEditor = {
    dataUser: mockData,
    alert: {}
}

const UserEditorReducer = (state = dataUserEditor, action) => {
    switch (action.type) {
        case '':
            return state
        
        default:
            return state
    }
}

export default UserEditorReducer;