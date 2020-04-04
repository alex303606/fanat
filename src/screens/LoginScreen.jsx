import React from 'react';
import { Text, View, Button } from 'react-native';

const LoginScreen = (props) => {
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Text>LoginScreen Screen</Text>
			<Button
				title="Go to Register"
				onPress={() => props.navigation.navigate('Register')}
			/>
		</View>
	);
};

export default LoginScreen;
