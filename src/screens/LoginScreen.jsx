import React, { useState } from 'react';
import {
	TextInput,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '30rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	input: {
		borderWidth: 1,
		borderColor: 'white',
		height: '42rem',
		paddingHorizontal: '13rem',
		borderRadius: 5,
		fontSize: '14rem',
		color: 'white',
		marginVertical: '25rem',
	},
	forget: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginVertical: '25rem',
	},
	registration: {
		color: 'white',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginVertical: '25rem',
	},
	content: {
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 1,
	},
	fields: {
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
});

const LoginScreen = (props) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const changeLoginHandler = value => setLogin(value);
	const changePasswordHandler = value => setPassword(value);
	const loginHandler = () => alert('Войти');
	const forgetPassHandler = () => alert('Забыли пароль?');
	const navigateToRegistration = () => props.navigation.navigate('Register');
	
	return (
		<ScreenContainer>
			<View style={styles.page}>
				<View style={styles.fields}>
					<TextInput
						style={styles.input}
						value={login}
						onChangeText={changeLoginHandler}
						underlineColorAndroid='transparent'
						placeholder={'Логин'}
						placeholderTextColor={'white'}
					/>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={changePasswordHandler}
						underlineColorAndroid='transparent'
						placeholder={'Пароль'}
						placeholderTextColor={'white'}
					/>
				</View>
				<View style={styles.content}>
					<Text onPress={forgetPassHandler} style={styles.forget}>Забыли пароль?</Text>
					<Text onPress={navigateToRegistration} style={styles.registration}>Регистрация</Text>
				</View>
				<Button onPress={loginHandler} title={'Войти'}/>
			</View>
		</ScreenContainer>
	);
};

export default LoginScreen;
