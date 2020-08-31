import dataRecentChat   from './data';
import dataSingleChat   from './dataSingle';
import dataGroupChat   from './dataGroup';

const ChatsData = {
    chatsList: dataRecentChat,
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
        
        case 'LIST_CHAT_RECENT':
            /** api lay ve danh sach chat GAN DAY */

            /** end  */
            // Sau khi lay danh sach chat ve thi cap nhat lai vao trong state
                state = { ...state, chatsList: dataRecentChat};
            return state;
            
        case 'LIST_CHAT_SINGLE':
            /** api lay ve danh sach chat DON */
            
            /** end  */
            // Sau khi lay danh sach chat ve thi cap nhat lai vao trong state
                state = { ...state, chatsList: dataSingleChat};
            return state;
        case 'LIST_CHAT_GROUP':
            /** api lay ve danh sach chat NHOM */
            
            /** end  */
            // Sau khi lay danh sach chat ve thi cap nhat lai vao trong state
                state = { ...state, chatsList: dataGroupChat};
            return state;

        default:
            return state
    }
}

export default Chats;