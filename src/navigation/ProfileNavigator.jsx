import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import Header from '../components/Header';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
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
					title: 'Профиль игрока',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={ProfileScreen}/>
		</Stack.Navigator>
	);
};

export default ProfileNavigator;
