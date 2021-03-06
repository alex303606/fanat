import {
	applyMiddleware,
	combineReducers,
	compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import profileReducer from './reducers/profile';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import tournamentsReducer from './reducers/tournaments';
import statsReducer from './reducers/stats';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [
	thunkMiddleware,
];

const enhancers = composeEnhancers(applyMiddleware.apply({}, middlewares));

const appReducer = combineReducers({
	profile: profileReducer,
	tournaments: tournamentsReducer,
	stats: statsReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: ['tournaments']
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export default () => {
	let store = createStore(persistedReducer, enhancers);
	let persistor = persistStore(store);
	return {store, persistor};
}
