import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import TournamentsScreen from '../screens/TournamentsScreen';
import Header from '../components/Header';
import ScannerScreen from '../screens/ScannerScreen';

const Stack = createStackNavigator();

const TournamentsNavigator = () => {
	return (
		<Stack.Navigator
			headerMode="float"
			screenOptions={{
				...Header,
			}}
		>
			<Stack.Screen
				name="First"
				options={{
					title: 'Турниры',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={TournamentsScreen}/>
			<Stack.Screen
				name="Scanner"
				options={{
					title: 'QR код',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={ScannerScreen}/>
		</Stack.Navigator>
	);
};

export default TournamentsNavigator;
