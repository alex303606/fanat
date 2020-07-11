import React, { useState } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import TournamentsScreen from '../screens/TournamentsScreen';
import Header from '../components/Header';
import ScannerScreen from '../screens/ScannerScreen';
import TournamentScreen from '../screens/TournamentScreen';
import TournamentSuccessfullyRegisteredScreen from '../screens/TournamentSuccessfullyRegisteredScreen';
import { TouchableOpacity, View } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import EStyleSheet from 'react-native-extended-stylesheet';
import FilterModal from '../components/FilterModal';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const styles = EStyleSheet.create({
	button: {
		marginRight: '10rem',
	},
	$25: '25rem',
});

const TournamentsNavigator = (props) => {
	const [modalVisible, changeModalVisible] = useState(false);
	const changeModalVisibleHandler = () => changeModalVisible(!modalVisible);
	
	return (
		<View style={{flex: 1}}>
			<FilterModal
				modalVisible={modalVisible}
				changeModalVisibleHandler={changeModalVisibleHandler}
			/>
			<Stack.Navigator
				initialRouteName='Tournaments'
				headerMode='float'
				screenOptions={{
					...Header,
				}}
			>
				<Stack.Screen
					name='Tournaments'
					options={{
						title: 'Турниры',
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
						headerRight: () => (
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={changeModalVisibleHandler}
								style={styles.button}
							>
								<CustomIcon
									color={props.filterGameIdOne || props.filterGameIdCommand ? '#D51E49' : 'white'}
									name={'filter'}
									size={styles.$25}/>
							</TouchableOpacity>
						),
					}}
					component={TournamentsScreen}/>
				<Stack.Screen
					name='Tournament'
					options={({route}) => {
						return {
							title: route.params && route.params.item && route.params.item.name ? route.params.item.name : 'Турнир',
							cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
						};
					}}
					component={TournamentScreen}/>
				<Stack.Screen
					name='Scanner'
					options={{
						title: 'QR код',
						cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
					}}
					component={ScannerScreen}/>
				<Stack.Screen
					name='Successfully'
					options={{
						title: 'Поздравляем!',
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					}}
					component={TournamentSuccessfullyRegisteredScreen}/>
			</Stack.Navigator>
		</View>
	);
};

const mapStateToProps = state => ({
	filterGameIdOne: state.tournaments.one.filterGameID,
	filterGameIdCommand: state.tournaments.command.filterGameID,
});

export default connect(mapStateToProps, null)(TournamentsNavigator);
