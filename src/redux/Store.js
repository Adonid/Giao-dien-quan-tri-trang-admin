import {
    SnackBarReducer as SnackBar
} from './reducers';

const redux = require('redux');

var allReducers = redux.combineReducers({
    dataSnackBar: SnackBar
});

const Store = redux.createStore(allReducers);

export default Store;