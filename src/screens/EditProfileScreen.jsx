import React, { useState } from 'react';
import ScreenWrapper from './ScreenWrapper';
import { Text, TextInput, View } from 'react-native';
import PickerImage from '../components/PickerImage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '../components/Button';
import EStyleSheet from 'react-native-extended-stylesheet';
import { regEmail } from '../utils';
import { editUser } from '../store/actions/profile';
import { useNavigation } from '@react-navigation/native';

const styles = EStyleSheet.create({
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
	row: {
		borderBottomWidth: 1,
		borderColor: 'white',
		paddingVertical: '5rem',
		marginVertical: '10rem',
	},
	label: {
		color: 'white',
		fontSize: '16rem',
		marginBottom: '5rem',
	},
	input: {
		color: 'white',
		fontSize: '16rem',
	},
	error: {
		color: '#D51E49',
		fontSize: '14rem',
		lineHeight: '16rem',
		marginTop: '10rem',
		fontWeight: 'bold',
	},
});

const EditProfileScreen = (props) => {
	const navigation = useNavigation();
	const [photo, setPhoto] = useState({uri: props.PHOTO || ''});
	const [email, setEmail] = useState(props.EMAIL || '');
	const [loading, setLoading] = useState(false);
	const [emailIsIncorrect, setEmailIsIncorrect] = useState(false);
	const [error, setError] = useState('');
	
	const changeEmailHandler = value => setEmail(value.replace(/ /g, ''));
	
	const save = () => {
		setEmailIsIncorrect(!regEmail.test(email));
		if (!regEmail.test(email) || loading) {
			return;
		}
		setLoading(true);
		props.editUser({email, photo}).then(data => {
			setLoading(false);
			if (data.result && data.data) {
				return navigation.navigate('Profile');
			}
			if (!!data.message) {
				setError(data.message);
			}
		});
	};
	
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<PickerImage
					avatar={photo}
					savePhoto={setPhoto}
				/>
				<View style={styles.row}>
					<Text style={styles.label}>Ваш e-mail:</Text>
					<TextInput
						numberOfLines={1}
						style={styles.input}
						value={email}
						autoCompleteType={'off'}
						onChangeText={changeEmailHandler}
						underlineColorAndroid='transparent'
						autoCapitalize={'none'}
					/>
				</View>
				{emailIsIncorrect && <Text style={styles.error}>Не верный формат e-mail</Text>}
				<Text style={styles.error}>{error}</Text>
				<View style={styles.footer}>
					<Button
						loading={loading}
						style={{marginVertical: 20}}
						onPress={save}
						title={'Сохранить'}
					/>
				</View>
			</View>
		</ScreenWrapper>
	);
};
const mapStateToProps = state => ({
	EMAIL: state.profile.user.EMAIL,
	PHOTO: state.profile.user.PHOTO,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			editUser,
		},
		dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
