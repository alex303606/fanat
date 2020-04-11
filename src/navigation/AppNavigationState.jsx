import React from 'react';
import AppNavigator from './AppNavigator';
import { StatusBar, View } from 'react-native';

const AppNavigationState = (props) => {
	return (
		<View style={{
			flex: 1,
			backgroundColor: '#19112C',
		}}>
			<StatusBar translucent barStyle="light-content" backgroundColor="#19112C" />
			<AppNavigator/>
		</View>
	);
};

export default AppNavigationState;
