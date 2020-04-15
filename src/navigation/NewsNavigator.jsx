import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ExampleScreen from '../screens/ExampleScreen';
import Header from '../components/Header';

const Stack = createStackNavigator();

const NewsNavigator = () => {
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
					title: 'Новости',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={ExampleScreen}/>
			<Stack.Screen
				name="Profile"
				options={{
					title: 'Новости',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={ExampleScreen}/>
		</Stack.Navigator>
	);
};

export default NewsNavigator;
