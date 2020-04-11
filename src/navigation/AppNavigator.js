import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Header from '../components/Header';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import TournamentsScreen from '../screens/TournamentsScreen';
const entireScreenWidth = Dimensions.get('window').width;

EStyleSheet.build({$rem: entireScreenWidth / 320});

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Tournaments'
				headerMode="float"
				screenOptions={{
					...Header,
				}}
			>
				<Stack.Screen
					name="Tournaments"
					options={{
						title: 'Турниры',
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					}}
					component={TournamentsScreen}
				/>
				
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
