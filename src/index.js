import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, { sagaMiddleware } from './store';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import saga from './sagas/saga';



sagaMiddleware.run(saga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
