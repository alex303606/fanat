import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ExampleScreen from '../screens/ExampleScreen';
import Header from '../components/Header';
import SecondScreen from '../screens/SecondScreen';

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
				component={ExampleScreen}/>
			<Stack.Screen
				name="Scanner"
				options={{
					title: 'QR код',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={SecondScreen}/>
		</Stack.Navigator>
	);
};

export default TournamentsNavigator;
