import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Header from '../components/Header';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import RecoveryAccount from '../screens/RecoveryAccount';
const entireScreenWidth = Dimensions.get('window').width;

EStyleSheet.build({$rem: entireScreenWidth / 320});

const Stack = createStackNavigator();

const AuthNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Login'
				headerMode="float"
				screenOptions={{
                    ...Header,
				}}
			>
				<Stack.Screen
					name="Login"
					options={{
						title: 'Войдите',
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					}}
					component={LoginScreen}
				/>
				<Stack.Screen
					name="Register"
					options={{
						title: 'Регистрация',
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					}}
					component={RegisterScreen}/>
				<Stack.Screen
					name="Recovery"
					options={{
						title: 'Восстановление аккаунта',
						cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					}}
					component={RecoveryAccount}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AuthNavigator;
