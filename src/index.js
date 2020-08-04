import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import { Store } from 'redux';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ Store }>
            <App />
        </Provider>
    </React.StrictMode>
    , document.getElementById('root')
);

serviceWorker.unregister();
