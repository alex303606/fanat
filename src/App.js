/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Provider } from 'react-redux';
import React from 'react';
import { Dimensions, Text } from 'react-native';
import AppNavigationState from './navigation/AppNavigationState';
import EStyleSheet from 'react-native-extended-stylesheet';
import Loader from './components/Loader';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store/configureStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const {persistor, store} = configureStore();
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 320});

if (Text && !Text.defaultProps) {
	Text.defaultProps = {};
	Text.defaultProps.allowFontScaling = false;
}

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loader/>} persistor={persistor}>
				<SafeAreaProvider>
					<AppNavigationState/>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
