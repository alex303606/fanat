import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import TournamentsScreen from '../screens/TournamentsScreen';
import Header from '../components/Header';
import ScannerScreen from '../screens/ScannerScreen';
import TournamentScreen from '../screens/TournamentScreen';
import TournamentSuccessfullyRegisteredScreen from '../screens/TournamentSuccessfullyRegisteredScreen';

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
				name="Tournaments"
				options={{
					title: 'Турниры',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={TournamentsScreen}/>
			<Stack.Screen
				name="Tournament"
				options={({route}) => {
					return {
						title: route.params && route.params.item && route.params.item.name ? route.params.item.name : 'Турнир',
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					};
				}}
				component={TournamentScreen}/>
			<Stack.Screen
				name="Scanner"
				options={{
					title: 'QR код',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={ScannerScreen}/>
			<Stack.Screen
				name="Successfully"
				options={{
					title: 'Поздравляем!',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={TournamentSuccessfullyRegisteredScreen}/>
		</Stack.Navigator>
	);
};

export default TournamentsNavigator;
