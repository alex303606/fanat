import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Header from '../components/Header';
import NewsScreen from '../screens/NewsScreen';
import NewsItemScreen from '../screens/NewsItemScreen';

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
				name="News"
				options={{
					title: 'Новости',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={NewsScreen}/>
			<Stack.Screen
				name="NewsItem"
				options={{
					title: 'Новости',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={NewsItemScreen}/>
		</Stack.Navigator>
	);
};

export default NewsNavigator;
