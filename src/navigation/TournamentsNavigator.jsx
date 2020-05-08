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

const Stack = createStackNavigator();

const styles = EStyleSheet.create({
	button: {
		marginRight: '10rem',
	},
	$20: '20rem',
});

const TournamentsNavigator = () => {
	const [modalVisible, changeModalVisible] = useState(false);
	const changeModalVisibleHandler = () => changeModalVisible(!modalVisible);
	
	return (
		<View style={{flex: 1}}>
			<FilterModal
				modalVisible={modalVisible}
				changeModalVisibleHandler={changeModalVisibleHandler}
			/>
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
						headerRight: () => (
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={changeModalVisibleHandler}
								style={styles.button}
							>
								<CustomIcon
									color={'white'}
									name={'filter'}
									size={styles.$20}/>
							</TouchableOpacity>
						),
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
		</View>
	);
};

export default TournamentsNavigator;
