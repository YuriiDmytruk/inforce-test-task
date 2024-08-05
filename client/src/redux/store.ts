import { createStore, Store } from 'redux';
import { combineReducers } from 'redux';

import { productsReducer } from './ducks/products';
import { commentsReducer } from './ducks/comments';

const rootReducer = combineReducers({
    products: productsReducer,
    comments: commentsReducer
});

export const store = createStore(rootReducer);