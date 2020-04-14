import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { recoverAccountSendCode, recoverAccountSendSms, recoverAccountSendPass } from '../store/actions/profile';
import IonIcon from 'react-native-vector-icons/Ionicons';

const passReg = /^(?=.*\d)(?=.*[a-z]).{8,}/;

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	block: {
		flexDirection: 'column',
		justifyContent: 'center',
		flexGrow: 1,
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
	label: {
		fontSize: '14rem',
		color: 'white',
		textAlign: 'center',
		marginBottom: '20rem',
		fontWeight: '500',
	},
	footer: {
		justifyContent: 'flex-end',
		paddingTop: '25rem',
	},
	error: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginTop: '10rem',
		fontWeight: 'bold',
	},
	inputContainer: {
		flexDirection: 'column',
		marginVertical: '15rem',
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
	inputPass: {
		height: '42rem',
		fontSize: '14rem',
		color: 'white',
		flexGrow: 1,
		paddingRight: '30rem',
	},
	rightBtn: {
		width: '30rem',
		height: '30rem',
		position: 'absolute',
		top: '50%',
		right: '10rem',
		marginTop: '-15rem',
	},
	$30: '30rem',
});

const RecoveryAccount = (props) => {
	const [login, changeLogin] = useState('');
	const [code, changeCode] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [passwordSecure, setPasswordSecure] = useState(true);
	const [rePasswordSecure, setRePasswordSecure] = useState(true);
	const [loginIsValid, setLoginIsValid] = useState(true);
	const [codeIsValid, setCodeIsValid] = useState(false);
	const [codeIsInCorrect, setCodeIsInCorrect] = useState(false);
	const [userNotExist, seUserNotExist] = useState(false);
	const [loading, setLoading] = useState(false);
	const [passwordsIsMatch, setPasswordsIsMatch] = useState(true);
	const [smsSended, setSmsSended] = useState(false);
	const [codeSended, setCodeSended] = useState(false);
	const [passIsValid, setPassIsValid] = useState(true);
	const changePasswordSecure = () => setPasswordSecure(!passwordSecure);
	const changeRePasswordSecure = () => setRePasswordSecure(!rePasswordSecure);
	
	const changeFieldValue = name => value => {
		switch (name) {
			case 'password':
				return setPassword(value.replace(/ /g, ''));
			case 'rePassword':
				return setRePassword(value.replace(/ /g, ''));
			case 'login':
				return changeLogin(value.replace(/ /g, ''));
			case 'code':
				return changeCode(value.replace(/[^0-9.]/g, ''));
			default:
				return;
		}
	};
	
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
	
	const renderChangeRePasswordSecureButton = () => (
		<TouchableOpacity
			style={styles.rightBtn}
			activeOpacity={0.7}
			onPress={changeRePasswordSecure}>
			<IonIcon
				name={rePasswordSecure ? 'ios-eye' : 'ios-eye-off'}
				size={styles.$30}
				color={'white'}
			/>
		</TouchableOpacity>
	);
	
	const sendHandler = () => {
		if (codeSended) {
			setPasswordsIsMatch(password === rePassword);
			setPassIsValid(passReg.test(password));
			if (passReg.test(password) && password === rePassword) {
				setLoading(true);
				props.recoverAccountSendPass({
					password,
					confirmPassword: rePassword
				});
				setTimeout(() => {
					props.navigation.navigate('Login');
				}, 2000);
			}
			return;
		}
		if (smsSended) {
			setCodeIsValid(code.length < 4);
			if (code.length > 3) {
				setLoading(true);
				props.recoverAccountSendCode(code);
				
				setTimeout(() => {
					setCodeSended(true);
					setLoading(false);
				}, 2000);
				
				// request is error
				// setTimeout(() => {
				// 	setCodeIsInCorrect(true);
				// 	setLoading(false);
				// }, 2000);
			}
			return;
		}
		setLoginIsValid(!!login);
		if (!!login) {
			setLoading(true);
			props.recoverAccountSendSms(login).then(data => {
				if (!data.result) {
					seUserNotExist(true);
					setLoading(false);
				} else {
					setSmsSended(true);
					setLoading(false);
				}
			});
		}
	};
	
	const renderLogin = () => (
		<View style={styles.block}>
			<Text style={styles.label}>Введите свой логин</Text>
			<TextInput
				style={styles.input}
				onChangeText={changeFieldValue('login')}
				underlineColorAndroid='transparent'
				value={login}
				autoCompleteType={'off'}
				autoCapitalize={'none'}
			/>
			{!loginIsValid && <Text style={styles.error}>Полу логин не может быть пустым</Text>}
			{userNotExist && <Text style={styles.error}>Такой пользователь не найден</Text>}
		</View>
	);
	
	const renderCode = () => (
		<View style={styles.block}>
			<Text style={styles.label}>Введите код</Text>
			<Text style={styles.label}>
				Введите код подтверждения из смс</Text>
			<TextInput
				style={styles.input}
				onChangeText={changeFieldValue('code')}
				underlineColorAndroid='transparent'
				value={code}
				autoCapitalize={'none'}
				keyboardType={'numeric'}
			/>
			{codeIsInCorrect && <Text style={styles.error}>Не верный код</Text>}
			{codeIsValid && <Text style={styles.error}>Код должен содержать 4 цифры</Text>}
		</View>
	);
	
	const renderPass = () => (
		<View style={styles.block}>
			<Text style={styles.label}>Придумайте новый пароль</Text>
			<View style={styles.inputContainer}>
				<View style={styles.rowPass}>
					<TextInput
						style={styles.inputPass}
						value={password}
						onChangeText={changeFieldValue('password')}
						underlineColorAndroid='transparent'
						secureTextEntry={passwordSecure}
						autoCapitalize={'none'}
					/>
					{renderChangePasswordSecureButton()}
				</View>
				{!passIsValid &&
				<Text style={styles.error}>
					Пароль должен содержать как минимум одну цифру и строчную букву и быть не менее 8 символов.
				</Text>}
			</View>
			
			<View style={styles.inputContainer}>
				<View style={styles.rowPass}>
					<TextInput
						style={styles.inputPass}
						value={rePassword}
						onChangeText={changeFieldValue('rePassword')}
						underlineColorAndroid='transparent'
						secureTextEntry={rePasswordSecure}
						autoCapitalize={'none'}
					/>
					{renderChangeRePasswordSecureButton()}
				</View>
				{!passwordsIsMatch && <Text style={styles.error}>Пароли не совпадают</Text>}
			</View>
		</View>
	);
	
	return (
		<ScreenContainer>
			<View style={styles.page}>
				{codeSended && !codeIsInCorrect ? renderPass() : smsSended ? renderCode() : renderLogin()}
				<View style={styles.footer}>
					<Button
						loading={loading}
						onPress={sendHandler}
						title={'Далее'}
					/>
				</View>
			</View>
		</ScreenContainer>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			recoverAccountSendSms,
			recoverAccountSendCode,
			recoverAccountSendPass,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(RecoveryAccount);
