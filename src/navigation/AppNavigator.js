import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { BackHandler, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatisticsNavigator from './StatisticsNavigator';
import ProfileNavigator from './ProfileNavigator';
import NewsNavigator from './NewsNavigator';
import TournamentsNavigator from './TournamentsNavigator';
import TabBarBottomContainer from '../components/TabBarBottomContainer';

const entireScreenWidth = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();
EStyleSheet.build({$rem: entireScreenWidth / 320});

class AppNavigatorState extends Component {
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
	}
	
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
	}
	
	onBackButtonPressed = () => true;
	
	render() {
		return (
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName='Tournaments'
					tabBar={props => <TabBarBottomContainer {...props} />}
				>
					<Tab.Screen name='Tournaments' component={TournamentsNavigator}/>
					<Tab.Screen name='News' component={NewsNavigator}/>
					<Tab.Screen name='Statistics' component={StatisticsNavigator}/>
					<Tab.Screen name='Profile' component={ProfileNavigator}/>
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}

const AppNavigator = () => <AppNavigatorState/>;

export default AppNavigator;
