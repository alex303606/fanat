import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

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

const ProfileSettingsScreen = () => {
	const navigation = useNavigation();
	return (
		<ScreenWrapper>
			<View style={styles.page}>
				<Button
					onPress={() => navigation.navigate('EditProfile')}
					title={'Редактирование'}
				/>
			</View>
		</ScreenWrapper>
	);
};

export default ProfileSettingsScreen;
