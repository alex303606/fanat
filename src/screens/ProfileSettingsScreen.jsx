import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { signOut } from '../store/actions/profile';
import { connect } from 'react-redux';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '10rem',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	item: {
		paddingVertical: '10rem',
		marginBottom: '10rem',
		borderBottomColor: 'white',
		borderBottomWidth: 1,
	},
	title: {
		color: 'white',
		fontSize: '16rem',
	},
});

const ProfileSettingsScreen = (props) => {
	const navigation = useNavigation();
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<Button
					style={{marginVertical: 20}}
					onPress={() => navigation.navigate('EditProfile')}
					title={'Редактирование'}
				/>
				<Button
					style={{marginVertical: 20}}
					onPress={() => props.signOut()}
					title={'Выйти из приложения'}
				/>
			</View>
		</ScreenWrapper>
	);
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
			signOut,
		},
		dispatch);
};

export default connect(null, mapDispatchToProps)(ProfileSettingsScreen);
