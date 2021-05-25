import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { leaders } from './leaders';
import { promotions } from './promotions';
import { favorites } from './favorites';
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from 'redux-persist/es/storage';

export const ConfigureStore = () => {
    
    const context = {
        key: 'root',
        storage,
        debug: true
    }

    const store = createStore(
        persistCombineReducers(context,{
            dishes,
            comments,
            leaders,
            promotions,
            favorites
        }),
        applyMiddleware( thunk, logger)
    );
    
    const persistor = persistStore(store);

    return { persistor, store };
}