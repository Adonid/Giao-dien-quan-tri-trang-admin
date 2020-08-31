import mockDataChat from './data';

const ChatsData = {
    chatsList: mockDataChat,
};


const Chats = (state = ChatsData, action) => {
    switch (action.type) {
        case 'VIEW_ITEM_CHAT':
            const id = action.id;
            /** api danh dau item la da doc & truyen data itemchat qua component cuoi hoi thoai */

            /** end */
            // Sau do loc du lieu ve trang thai item chat
            let updateChatsList = [...state.chatsList];
            updateChatsList.forEach( el => {
                el.isSelected=false;
                if(el.id===id){
                    el.isReaded=true;
                    el.isSelected=true;
                }
            });
            state = { ...state, chatsList: updateChatsList};
            return state
        
        default:
            return state
    }
}

export default Chats;