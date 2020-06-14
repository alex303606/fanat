import React, { useState } from 'react';
import ScreenWrapper from './ScreenWrapper';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../components/Button';
import EStyleSheet from 'react-native-extended-stylesheet';
import { changePassword, signOut } from '../store/actions/profile';
import { passReg } from '../utils';
import IonIcon from 'react-native-vector-icons/Ionicons';

const styles = EStyleSheet.create({
	$30: '30rem',
	page: {
		flex: 1,
		paddingTop: '20rem',
		paddingHorizontal: '20rem',
		paddingBottom: '10rem',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	footer: {
		paddingTop: '20rem',
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
	},
	error: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginTop: '10rem',
		fontWeight: 'bold',
	},
	row: {
		marginBottom: '20rem',
	},
	label: {
		color: 'white',
		fontSize: '16rem',
	},
	rowPass: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		position: 'relative',
		paddingRight: '30rem',
		borderBottomWidth: 1,
		borderColor: 'white',
	},
	input: {
		height: '42rem',
		fontSize: '14rem',
		color: 'white',
		flexGrow: 1,
	},
	rightBtn: {
		width: '30rem',
		height: '30rem',
		position: 'absolute',
		top: '50%',
		right: 0,
		marginTop: '-15rem',
	},
});

const ChangePassScreen = (props) => {
	const [newPassword, setNewPassword] = useState('');
	const [reNewPassword, setReNewPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [passIsValid, setPassIsValid] = useState(true);
	const [error, setError] = useState('');
	const [passwordsIsMatch, setPasswordsIsMatch] = useState(true);
	const [passwordSecure, setPasswordSecure] = useState(true);
	const [rePasswordSecure, setRePasswordSecure] = useState(true);
	const changePasswordSecure = () => setPasswordSecure(!passwordSecure);
	const changeRePasswordSecure = () => setRePasswordSecure(!rePasswordSecure);
	
	const changePassHandler = field => value => {
		switch (field) {
			case 'new':
				setNewPassword(value.replace(/ /g, ''));
				return;
			case 'reNew':
				setReNewPassword(value.replace(/ /g, ''));
				return;
			default:
				return;
		}
	};
	
	const save = () => {
		setPassIsValid(passReg.test(newPassword));
		setPasswordsIsMatch(newPassword === reNewPassword);
		if (!passReg.test(newPassword) || newPassword !== reNewPassword) {
			return;
		}
		setLoading(true);
		props.changePassword(newPassword, reNewPassword).then(res => {
			if (res && res.result) {
				return props.signOut();
			}
			if (res && !!res.message) {
				setError(res.message);
			}
		});
	};
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<View style={styles.row}>
					<Text style={styles.label}>Новый пароль</Text>
					<View style={styles.rowPass}>
						<TextInput
							numberOfLines={1}
							style={styles.input}
							value={newPassword}
							autoCompleteType={'off'}
							secureTextEntry={passwordSecure}
							onChangeText={changePassHandler('new')}
							underlineColorAndroid='transparent'
							autoCapitalize={'none'}
						/>
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
					</View>
					{!passIsValid && <Text style={styles.error}>
						Пароль должен содержать как минимум одну цифру и строчную букву и быть не менее 8 символов.
					</Text>}
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Новый пароль еще раз</Text>
					<View style={styles.rowPass}>
						<TextInput
							numberOfLines={1}
							style={styles.input}
							value={reNewPassword}
							autoCompleteType={'off'}
							secureTextEntry={rePasswordSecure}
							onChangeText={changePassHandler('reNew')}
							underlineColorAndroid='transparent'
							autoCapitalize={'none'}
						/>
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
					</View>
					{!passwordsIsMatch && <Text style={styles.error}>Пароли не совпадают</Text>}
				</View>
				<Text style={styles.error}>{error}</Text>
				<View style={styles.footer}>
					<Button
						loading={loading}
						style={{marginVertical: 20}}
						onPress={save}
						title={'Применить'}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			changePassword,
			signOut,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(ChangePassScreen);
