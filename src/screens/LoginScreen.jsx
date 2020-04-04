import React, { useState } from 'react';
import {
	TextInput,
	View,
	TouchableOpacity,
	ImageBackground,
	Text, ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import backGround from '../assets/img/background.jpg';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '30rem',
		paddingBottom: '40rem',
		paddingTop: '165rem',
	},
	backGround: {
		width: '100%',
		height: '100%',
	},
	input: {
		borderWidth: 1,
		borderColor: 'white',
		height: '42rem',
		paddingHorizontal: '13rem',
		borderRadius: 5,
		fontSize: '14rem',
		color: 'white',
		marginBottom: '50rem',
	},
	forget: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginBottom: '50rem',
	},
	registration: {
		color: 'white',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginBottom: '75rem',
	},
	button: {
		backgroundColor: '#D51E49',
		height: '42rem',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: '14rem',
		lineHeight: '16rem',
	},
	content: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const LoginScreen = (props) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const changeLoginHandler = value => setLogin(value);
	const changePasswordHandler = value => setPassword(value);
	return (
		<View style={{flex: 1, backgroundColor: '#19112C'}}>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{flexGrow: 1}}
			>
				<ImageBackground source={backGround} style={styles.backGround}>
					<View style={styles.page}>
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
						<View style={styles.content}>
							<Text style={styles.forget}>Забыли пароль?</Text>
							<Text style={styles.registration}>Регистрация</Text>
						</View>
						<TouchableOpacity
							style={styles.button}
							onPress={() => props.navigation.navigate('Register')}>
							<Text style={styles.buttonText}>Войти</Text>
						</TouchableOpacity>
					</View>
					<KeyboardSpacer style={{backgroundColor: '#19112C'}}/>
				</ImageBackground>
			</ScrollView>
		</View>
	);
};

export default LoginScreen;
