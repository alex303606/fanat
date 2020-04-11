/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Provider } from 'react-redux';
import React from 'react';
import { Dimensions } from 'react-native';
import AppNavigationState from './navigation/AppNavigationState';
import EStyleSheet from 'react-native-extended-stylesheet';
import Loader from './components/Loader';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store/configureStore';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';

const {persistor, store} = configureStore();
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 320});

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loader/>} persistor={persistor}>
				<SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
					<AppNavigationState/>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
