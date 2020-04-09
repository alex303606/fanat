import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import PickerImage from '../components/PickerImage';
import { TextInputMask } from 'react-native-masked-text';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '30rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
	},
	input: {
		height: '42rem',
		paddingHorizontal: '5rem',
		fontSize: '14rem',
		color: 'white',
		flexGrow: 1,
	},
	label: {
		fontSize: '14rem',
		color: 'white',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		height: '42rem',
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		marginBottom: '10rem',
	},
	footer: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		paddingTop: '25rem',
	},
	checkBoxRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: '25rem',
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
});

const RegisterScreen = (props) => {
	const nextHandler = () => props.navigation.navigate('Login');
	const [avatar, setAvatar] = useState('');
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [rules, setRules] = useState(false);
	const changeLoginHandler = value => setLogin(value);
	const changePasswordHandler = value => setPassword(value);
	const changePhone = value => setPhone(value);
	const changeRules = () => setRules(!rules);
	
	return (
		<ScreenContainer>
			<View style={styles.page}>
				<PickerImage
					avatar={avatar}
					savePhoto={setAvatar}
				/>
				<View>
					<View style={styles.row}>
						<Text style={styles.label}>Логин:</Text>
						<TextInput
							style={styles.input}
							value={login}
							onChangeText={changeLoginHandler}
							underlineColorAndroid='transparent'
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Пароль:</Text>
						<TextInput
							style={styles.input}
							value={password}
							onChangeText={changePasswordHandler}
							underlineColorAndroid='transparent'
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Подтверждение пароля:</Text>
						<TextInput
							style={styles.input}
							value={password}
							onChangeText={changePasswordHandler}
							underlineColorAndroid='transparent'
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Номер телефона:</Text>
						<TextInputMask
							keyboardType='phone-pad'
							underlineColorAndroid='transparent'
							autoCorrect={false}
							type={'custom'}
							options={{mask: '0 999 99-99-99'}}
							onChangeText={changePhone}
							value={phone}
							style={styles.input}
							autoCompleteType={'tel'}
						/>
					</View>
					<View style={styles.row}>
						<Text style={styles.label}>Ваш e-mail:</Text>
						<TextInput
							style={styles.input}
							value={email}
							autoCompleteType={'email'}
							autoCapitalize={'none'}
							keyboardType={'email-address'}
							onChangeText={changePasswordHandler}
							underlineColorAndroid='transparent'
						/>
					</View>
				</View>
				<View style={styles.checkBoxRow}>
					<TouchableOpacity
						onPress={changeRules}
						activeOpacity={0.7}
						style={[styles.checkBox, {backgroundColor: rules ? '#D51E49' : 'transparent'}]}
					/>
					<Text style={styles.checkBoxLabel}>С правилами ознакомлен</Text>
				</View>
				<View style={styles.rules}><Text style={styles.rulesText}>Правила</Text></View>
				<View style={styles.footer}>
					<Button onPress={nextHandler} title={'Далее'}/>
				</View>
			</View>
		</ScreenContainer>
	);
};

export default RegisterScreen;
