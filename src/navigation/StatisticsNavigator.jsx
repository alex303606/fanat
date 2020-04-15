import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ExampleScreen from '../screens/ExampleScreen';
import Header from '../components/Header';

const Stack = createStackNavigator();

const StatisticsNavigator = () => {
	return (
		<Stack.Navigator
			headerMode="float"
			screenOptions={{
				...Header,
			}}
		>
			<Stack.Screen
				name="Home"
				options={{
					title: 'Статистика',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={ExampleScreen}/>
		</Stack.Navigator>
	);
};

export default StatisticsNavigator;
