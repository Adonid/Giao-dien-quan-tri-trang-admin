import {
    NotifysReducers as Notifys,
    UsersListReducers as UsersList
} from './reducers';

const redux = require('redux');

var allReducers = redux.combineReducers({
    dataNotifys: Notifys,
    dataNewUser: UsersList
});

const Store = redux.createStore(allReducers);

export default Store;