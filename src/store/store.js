import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

const middlewares = [thunk];

let initialState = {
    pending: false,
    success: false,
    error: false,
    data: {},
    dmInboxData: {},
    commentInboxData: {},
    msgData: {},
    accountInfo: {},
    dmNotification: false,
    commentNotification: false,
    bot: 0,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
));

export default store;
