import {
    NotifysReducers as Notifys,
    UsersListReducers as UsersList,
    UserDetailReducer as UsersDetail,
    UserEditorReducer as UserEditor,
    ChatsDataReducer as ChatsData,
    ProductsListReducer as ProductsList,
    ManipulationPostReducer as ManipulationPost,
    PostDetailReducer as PostDetail,
    ProductEditReducer as ProductEdit,

} from './reducers';

const redux = require('redux');

var allReducers = redux.combineReducers({
    dataNotifys: Notifys,
    dataNewUser: UsersList,
    dataUserDetail: UsersDetail,
    dataUserEditor: UserEditor,
    ChatsData: ChatsData,
    dataProductsList: ProductsList,
    dataManipulationPost: ManipulationPost,
    dataPostDetail: PostDetail,
    dataPostEdit: ProductEdit,
});

const Store = redux.createStore(allReducers);

export default Store;