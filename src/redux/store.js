import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import screamReducer from './reducers/screamReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    userReducer,
    screamReducer
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
