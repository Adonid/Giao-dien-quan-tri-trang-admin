import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux';
import Store from './redux';
import { persistStore } from 'redux-persist';

var persistor = persistStore(Store);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ Store }>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root')
);

serviceWorker.unregister();
