import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import PickerImage from '../components/PickerImage';
import { TextInputMask } from 'react-native-masked-text';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import CustomModal from '../components/CustomModal';
import LoremText from '../components/LoremText';
import { bindActionCreators } from 'redux';
import { registerNewUser } from '../store/actions/profile';
import { connect } from 'react-redux';

const passReg = /^(?=.*\d)(?=.*[a-z]).{8,}/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const phoneValidator = (phone) => {
	const phoneNumber = parsePhoneNumberFromString(phone.replace(0, '+996'));
	if (phoneNumber) {
		return phoneNumber.isValid();
	}
	return false;
};

const styles = EStyleSheet.create({
	$25: '25rem',
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	footer: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		paddingTop: '25rem',
	},
	checkBoxRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkBox: {
		width: '20rem',
		height: '20rem',
		borderRadius: '5rem',
		borderWidth: 1,
		borderColor: '#D51E49',
		marginRight: '10rem',
	},
	checkBoxLabel: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
	},
	rules: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	rulesText: {
		color: 'white',
		fontSize: '14rem',
		lineHeight: '16rem',
	},
	inputsContainer: {
		paddingTop: '10rem',
	},
	rightBtn: {
		width: '30rem',
		height: '30rem',
		position: 'absolute',
		top: '50%',
		right: 0,
		marginTop: '-15rem',
	},
	error: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginTop: '10rem',
		fontWeight: 'bold',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: '42rem',
		borderBottomWidth: 1,
		borderBottomColor: 'white',
	},
	input: {
		height: '42rem',
		paddingHorizontal: '5rem',
		fontSize: '14rem',
		color: 'white',
		flex: 1,
		flexGrow: 1,
	},
	label: {
		fontSize: '14rem',
		color: 'white',
		flexWrap: 'wrap',
	},
	inputContainer: {
		flexDirection: 'column',
		marginBottom: '10rem',
	},
	rowPass: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: '5rem',
		position: 'relative',
		flexGrow: 1,
		flex: 1,
		paddingRight: '30rem',
	},
	inputPass: {
		height: '42rem',
		fontSize: '14rem',
		color: 'white',
		flexGrow: 1,
	},
	$30: '30rem',
	modalTitle: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
});

const RegisterScreen = (props) => {
	const [avatar, setAvatar] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [rules, setRules] = useState(false);
	const [familiar, setFamiliar] = useState(true);
	const [passwordSecure, setPasswordSecure] = useState(true);
	const [rePasswordSecure, setRePasswordSecure] = useState(true);
	const [loading, setLoading] = useState(false);
	const [loginIsValid, setLoginIsValid] = useState(true);
	const [passIsValid, setPassIsValid] = useState(true);
	const [emailIsValid, setEmailIsValid] = useState(true);
	const [passwordsIsMatch, setPasswordsIsMatch] = useState(true);
	const [phoneIsValid, setPhoneIsValid] = useState(true);
	const [modalVisible, changeModalVisible] = useState(false);
	const changeRules = () => setRules(!rules);
	const changePasswordSecure = () => setPasswordSecure(!passwordSecure);
	const changeRePasswordSecure = () => setRePasswordSecure(!rePasswordSecure);
	const changeModalVisibleHandler = () => changeModalVisible(!modalVisible);
	const acceptRules = () => {
		setRules(true);
		changeModalVisible(false);
	};
	const changeFieldValue = name => value => {
		switch (name) {
			case 'login':
				return setLogin(value.replace(/ /g, ''));
			case 'password':
				return setPassword(value.replace(/ /g, ''));
			case 'rePassword':
				return setRePassword(value.replace(/ /g, ''));
			case 'email':
				return setEmail(value.replace(/ /g, ''));
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
	
	const nextHandler = () => {
		setPasswordsIsMatch(password === rePassword);
		setLoginIsValid(!!login);
		setPassIsValid(passReg.test(password));
		setEmailIsValid(regEmail.test(email));
		setPhoneIsValid(phoneValidator(phone));
		setFamiliar(rules);
		if (
			!passReg.test(password) ||
			password !== rePassword ||
			!login ||
			!regEmail.test(email) ||
			!phoneValidator(phone) ||
			!rules
		) {
			return;
		}
		setLoading(true);
		props.registerNewUser({
			login,
			phone,
			email,
			password,
			confirmPassword: rePassword,
		});
		setTimeout(() => {
			props.navigation.navigate('Login');
		}, 2000);
	};
	
	return (
		<ScreenContainer>
			<View style={styles.page}>
				<PickerImage
					avatar={avatar}
					savePhoto={setAvatar}
				/>
				<View style={styles.inputsContainer}>
					<View style={styles.inputContainer}>
						<View style={styles.row}>
							<Text style={styles.label}>Логин:</Text>
							<TextInput
								autoFocus={true}
								numberOfLines={1}
								style={styles.input}
								value={login}
								onChangeText={changeFieldValue('login')}
								underlineColorAndroid='transparent'
								autoCapitalize={'none'}
							/>
						</View>
						{!loginIsValid && <Text style={styles.error}>Заполните поле логин</Text>}
					</View>
					
					<View style={{flexDirection: 'column'}}>
						<View style={styles.row}>
							<Text style={styles.label}>Пароль:</Text>
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
						</View>
						{!passIsValid &&
						<Text style={styles.error}>
							Пароль должен содержать как минимум одну цифру и строчную букву и быть не менее 8 символов.
						</Text>}
					</View>
					
					<View style={styles.inputContainer}>
						<View style={styles.row}>
							<Text style={styles.label}>Подтверждение:</Text>
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
						</View>
						{!passwordsIsMatch && <Text style={styles.error}>Пароли не совпадают</Text>}
					</View>
					<View style={styles.inputContainer}>
						<View style={styles.row}>
							<Text style={styles.label}>Номер телефона:</Text>
							<TextInputMask
								keyboardType='phone-pad'
								underlineColorAndroid='transparent'
								autoCorrect={false}
								type={'custom'}
								options={{mask: '0 999 99-99-99'}}
								onChangeText={setPhone}
								value={phone}
								style={styles.input}
								autoCompleteType={'tel'}
							/>
						</View>
						{!phoneIsValid && <Text style={styles.error}>Не верный формат телефона</Text>}
					</View>
					<View style={styles.inputContainer}>
						<View style={styles.row}>
							<Text style={styles.label}>Ваш e-mail:</Text>
							<TextInput
								style={styles.input}
								value={email}
								autoCompleteType={'email'}
								autoCapitalize={'none'}
								keyboardType={'email-address'}
								onChangeText={changeFieldValue('email')}
								underlineColorAndroid='transparent'
							/>
						</View>
						{!emailIsValid && <Text style={styles.error}>Не верный формат e-mail</Text>}
					</View>
				</View>
				<View style={[styles.inputContainer, {paddingVertical: styles.$25}]}>
					<View style={styles.checkBoxRow}>
						<TouchableOpacity
							onPress={changeRules}
							activeOpacity={0.7}
							style={[styles.checkBox, {backgroundColor: rules ? '#D51E49' : 'transparent'}]}
						/>
						<Text style={styles.checkBoxLabel}>С правилами ознакомлен</Text>
					</View>
					{!familiar && <Text style={styles.error}>Ознакомьтесь с правилами</Text>}
				</View>
				<View style={styles.rules}>
					<Text onPress={changeModalVisibleHandler} style={styles.rulesText}>Правила</Text>
				</View>
				<View style={styles.footer}>
					<Button
						loading={loading}
						onPress={nextHandler}
						title={'Зарегистрироваться'}
					/>
				</View>
			</View>
			<CustomModal modalVisible={modalVisible} setModalVisible={changeModalVisibleHandler}>
				<Text style={styles.modalTitle}>ПРАВИЛА</Text>
				<ScrollView contentContainerStyle={{flexGrow: 1}}>
					<LoremText style={{color: 'white', textAlign: 'justify'}}/>
				</ScrollView>
				<View style={styles.footer}>
					<Button
						loading={loading}
						onPress={acceptRules}
						title={'Принять'}
					/>
				</View>
			</CustomModal>
		</ScreenContainer>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			registerNewUser,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
