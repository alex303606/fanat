import React from 'react';
import { Button, ImageBackground, Text, View } from 'react-native';
import backGround from '../assets/img/background.jpg';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	backGround: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const RegisterScreen = (props) => {
	return (
		<View style={{flex: 1}}>
			<ImageBackground
				source={backGround}
				style={styles.backGround}
			>
				<Text>LoginScreen Screen</Text>
				<Button
					title="Go to Login"
					onPress={() => props.navigation.navigate('Login')}
				/>
			</ImageBackground>
		</View>
	);
};

export default RegisterScreen;
