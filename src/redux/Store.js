import {
    NotifysReducers as Notifys,
    UsersListReducers as UsersList,
    UserDetailReducer as UsersDetail
} from './reducers';

const redux = require('redux');

var allReducers = redux.combineReducers({
    dataNotifys: Notifys,
    dataNewUser: UsersList,
    dataUserDetail: UsersDetail
});

const Store = redux.createStore(allReducers);

export default Store;