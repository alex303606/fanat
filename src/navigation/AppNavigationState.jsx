import React from 'react';
import AppNavigator from './AppNavigator';
import { useSafeArea } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';

const AppNavigationState = (props) => {
	const insets = useSafeArea();
	return (
		<View style={{
			flex: 1,
			paddingBottom: insets.bottom,
			backgroundColor: '#19112C',
		}}>
			<StatusBar translucent barStyle="light-content" backgroundColor="#19112C" />
			<AppNavigator/>
		</View>
	);
};

export default AppNavigationState;
