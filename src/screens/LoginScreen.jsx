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
import IonIcon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { loginUser } from '../store/actions/profile';
import { connect } from 'react-redux';

IonIcon.loadFont();

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	input: {
		height: '42rem',
		fontSize: '14rem',
		color: 'white',
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 5,
		paddingHorizontal: '13rem',
	},
	inputPass: {
		height: '42rem',
		fontSize: '14rem',
		color: 'white',
		flexGrow: 1,
		paddingRight: '30rem',
	},
	rowPass: {
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: '13rem',
		position: 'relative',
	},
	row: {
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
	rightBtn: {
		width: '30rem',
		height: '30rem',
		position: 'absolute',
		top: '50%',
		right: '10rem',
		marginTop: '-15rem',
	},
	authError: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	error: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginTop: '10rem',
		fontWeight: 'bold'
	},
	$30: '30rem',
});

const LoginScreen = (props) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [passIsValid, setPassIsValid] = useState(true);
	const [loginIsValid, setLoginIsValid] = useState(true);
	const [passwordSecure, setPasswordSecure] = useState(true);
	const [loading, setLoading] = useState(false);
	const [authError, setAuthError] = useState(false);
	const changePasswordSecure = () => setPasswordSecure(!passwordSecure);
	const loginHandler = () => {
		setLoginIsValid(!!login);
		setPassIsValid(!!password);
		if (!login || !password) {
			return;
		}
		setLoading(true);
		props.loginUser(login, password).then(data => {
			if (!data.result) {
				setAuthError(true);
			}
			setLoading(false);
		});
	};
	const forgetPassHandler = () => props.navigation.navigate('Recovery');
	const navigateToRegistration = () => props.navigation.navigate('Register');
	const renderChangePasswordSecureButton = () => (
		<TouchableOpacity
			style={styles.rightBtn}
			activeOpacity={0.7}
			onPress={changePasswordSecure}>
			<IonIcon
				name={passwordSecure ? 'ios-eye' : 'ios-eye-off'}
				size={styles.$30}
				color={'white'}
			/>
		</TouchableOpacity>
	);
	
	const changeFieldValue = name => value => {
		switch (name) {
			case 'login':
				return setLogin(value.replace(/ /g, ''));
			case 'password':
				return setPassword(value.replace(/ /g, ''));
			default:
				return;
		}
	};
	
	return (
		<ScreenContainer>
			<View style={styles.page}>
				<View style={styles.fields}>
					<View style={styles.row}>
						<TextInput
							style={styles.input}
							value={login}
							onChangeText={changeFieldValue('login')}
							underlineColorAndroid='transparent'
							placeholder={'Логин'}
							placeholderTextColor={'white'}
							autoCapitalize={'none'}
							autoCompleteType={'off'}
						/>
						{!loginIsValid && <Text style={styles.error}>Заполните поле логин</Text>}
					</View>
					<View style={styles.row}>
						<View style={styles.rowPass}>
							<TextInput
								style={styles.inputPass}
								value={password}
								onChangeText={changeFieldValue('password')}
								underlineColorAndroid='transparent'
								placeholder={'Пароль'}
								secureTextEntry={passwordSecure}
								placeholderTextColor={'white'}
								autoCapitalize={'none'}
								autoCompleteType={'off'}
							/>
							{renderChangePasswordSecureButton()}
						</View>
						{!passIsValid && <Text style={styles.error}>Заполните поле пароль</Text>}
					</View>
					{authError &&
					<View style={styles.authError}>
						<Text style={styles.error}>Неверный логин или паррль</Text>
					</View>
					}
				</View>
				
				<View style={styles.content}>
					<Text onPress={forgetPassHandler} style={styles.forget}>Забыли пароль?</Text>
					<Text onPress={navigateToRegistration} style={styles.registration}>Регистрация</Text>
				</View>
				<Button
					loading={loading}
					onPress={loginHandler}
					title={'Войти'}
				/>
			</View>
		</ScreenContainer>
	);
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			loginUser,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(LoginScreen);
