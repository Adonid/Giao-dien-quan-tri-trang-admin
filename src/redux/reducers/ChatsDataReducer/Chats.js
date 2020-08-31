import mockDataChat from './data';

const ChatsData = {
    chatsList: mockDataChat,
};


const Chats = (state = ChatsData, action) => {
    switch (action.type) {
        case 'VIEW_ITEM_CHAT':
            const id = action.id;
            console.log(id);
            return state
        
        default:
            return state
    }
}

export default Chats;