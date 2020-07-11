import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Header from '../components/Header';
import { connect } from 'react-redux';
import NotTeamScreen from '../screens/NotTeamScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';
import CreateTeamSuccessfullyScreen from '../screens/CreateTeamSuccessfullyScreen';

const Stack = createStackNavigator();

const CreateTeamNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='Profile'
			headerMode='float'
			screenOptions={{
				...Header,
			}}
		>
			<Stack.Screen
				name='Team'
				options={{
					title: 'Создание команды',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={NotTeamScreen}/>
			<Stack.Screen
				name='CreateTeam'
				options={{
					title: 'Создание команды',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={CreateTeamScreen}/>
			<Stack.Screen
				name='CreateTeamSuccessfully'
				options={{
					title: 'Создание команды',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
				component={CreateTeamSuccessfullyScreen}/>
		</Stack.Navigator>
	);
};

const mapStateToProps = state => ({
	profileType: state.profile.profileType,
});

export default connect(mapStateToProps, null)(CreateTeamNavigator);
