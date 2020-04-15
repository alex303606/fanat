import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Header from '../components/Header';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const entireScreenWidth = Dimensions.get('window').width;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatisticsNavigator from './StatisticsNavigator';
import ProfileNavigator from './ProfileNavigator';
import NewsNavigator from './NewsNavigator';
import TournamentsNavigator from './TournamentsNavigator';
import TabBarBottomContainer from '../components/TabBarBottomContainer';

const Tab = createBottomTabNavigator();
EStyleSheet.build({$rem: entireScreenWidth / 320});

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Tournaments"
				tabBar={props => <TabBarBottomContainer {...props} />}
			>
				<Tab.Screen name="Tournaments" component={TournamentsNavigator} />
				<Tab.Screen name="News" component={NewsNavigator} />
				<Tab.Screen name="Statistics" component={StatisticsNavigator} />
				<Tab.Screen name="Profile" component={ProfileNavigator} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
