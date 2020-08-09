import {
    NotifysReducers as Notifys,
    UserReducers as User
} from './reducers';

const redux = require('redux');

var allReducers = redux.combineReducers({
    dataNotifys: Notifys,
    dataUser: User
});

const Store = redux.createStore(allReducers);

export default Store;