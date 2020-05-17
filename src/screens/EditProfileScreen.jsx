import React from 'react';
import ScreenWrapper from './ScreenWrapper';
import { Text, View } from 'react-native';

const EditProfileScreen = () => {
	return (
		<ScreenWrapper>
			<View style={{
				flex: 1,
				justifyContent: 'center',
			}}>
				<Text style={{
					color: 'white',
					fontSize: 20,
					fontWeight: 'bold',
					textAlign: 'center',
				}}>Редактирование профиля</Text>
			</View>
		
		</ScreenWrapper>
	);
};

export default EditProfileScreen;
