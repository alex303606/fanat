import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import Header from '../components/Header';
import { TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionic from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { useNavigation } from '@react-navigation/native';
import ChangePassScreen from '../screens/ChangePassScreen';

const Stack = createStackNavigator();

const styles = EStyleSheet.create({
	button: {
		marginRight: '10rem',
	},
	$settings: '25rem',
	$close: '30rem',
});

const SettingButton = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => navigation.navigate('ProfileSettings')}
			style={styles.button}
		>
			<Icon
				color={'white'}
				name={'settings'}
				size={styles.$settings}/>
		</TouchableOpacity>
	);
};

const CloseButton = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => navigation.navigate('Profile')}
			style={styles.button}
		>
			<Ionic
				color={'white'}
				name={'close-circle'}
				size={styles.$close}/>
		</TouchableOpacity>
	);
};

const ProfileNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='Profile'
			headerMode="float"
			screenOptions={{
				...Header,
				headerStyle: {
					...Header.headerStyle,
					borderBottomWidth: 1,
					borderColor: 'rgba(255, 255, 255, 0.75)',
				},
			}}
		>
			<Stack.Screen
				name="Profile"
				options={{
					title: 'Профиль игрока',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					headerRight: () => <SettingButton/>,
				}}
				component={ProfileScreen}/>
			<Stack.Screen
				name="ProfileSettings"
				options={{
					title: 'Настройки',
					cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
					headerRight: () => <CloseButton/>,
				}}
				component={ProfileSettingsScreen}/>
			<Stack.Screen
				name="EditProfile"
				options={{
					title: 'Редактирование',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					headerRight: () => <CloseButton/>,
				}}
				component={EditProfileScreen}/>
			<Stack.Screen
				name="ChangePass"
				options={{
					title: 'Изменение пароля',
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					headerRight: () => <CloseButton/>,
				}}
				component={ChangePassScreen}/>
		</Stack.Navigator>
	);
};

export default ProfileNavigator;
