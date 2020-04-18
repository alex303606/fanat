import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Header from '../components/Header';
import NewsScreen from '../screens/NewsScreen';

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
				component={NewsScreen}/>
		</Stack.Navigator>
	);
};

export default NewsNavigator;
