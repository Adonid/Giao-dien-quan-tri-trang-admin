import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import { Store } from 'redux';

ReactDOM.render(
    <Provider store={ Store }>
        <App />
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
