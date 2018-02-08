import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Reducers
import allReducers from './reducers/allReducers';

// Actions
import loadShapes from './actions/loadShapes';

// Components
import App from './components/App';
// import Options from './components/Options';
// import SkinBase from './components/SkinBase';
// import Credit from './components/Credit';

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var store = createStore(
    allReducers,
    composeEnhancers(
        applyMiddleware(thunk, logger)
    )
);

store.dispatch(loadShapes);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);