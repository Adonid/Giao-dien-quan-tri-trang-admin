import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
    NotifysReducers as Notifys,
    UsersListReducers as UsersList,
    UserDetailReducer as UsersDetail,
    ChatsDataReducer as ChatsData,
    ProductsListReducer as ProductsList,
    ManipulationPostReducer as ManipulationPost,
    PostDetailReducer as PostDetail,
    ProductEditReducer as ProductEdit,
    CategoryTagReducer as CategoryTag,
    TermReducer as Term,

    LoginReducer as Login,
    ForgetPwReducer as ForgetPw,
    MannegerUserReducer as MannegerUser,
    MessageReducer as Message,
    UserProfileReducer as UserProfile,
    UploadAvatarReducer as UploadAvatar,
    AddressReducer as Address,

} from './reducers';

const allReducers = combineReducers({
    dataNotifys: Notifys,
    dataNewUser: UsersList,
    dataUserDetail: UsersDetail,
    ChatsData: ChatsData,
    dataProductsList: ProductsList,
    dataManipulationPost: ManipulationPost,
    dataPostDetail: PostDetail,
    dataPostEdit: ProductEdit,
    dataCategoryTag: CategoryTag,
    dataTerm: Term,
    
    dataMessage: Message,
    dataLogin: Login,
    dataResetPassword: ForgetPw,
    dataMannegerUser: MannegerUser,
    dataUserProfile: UserProfile,
    dataUploadAvatar: UploadAvatar,
    dataAddress: Address,
});

const persistedReducer = persistReducer({key: 'root', storage} , allReducers);

const Store = createStore(persistedReducer, applyMiddleware( thunk, logger));

export default Store;