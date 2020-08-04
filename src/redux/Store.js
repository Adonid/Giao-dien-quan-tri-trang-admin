import {
    NotifysReducers as Notifys
} from './reducers';

const redux = require('redux');

var allReducers = redux.combineReducers({
    dataNotifys: Notifys
});

const Store = redux.createStore(allReducers);

export default Store;