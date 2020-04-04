import React from 'react';
import { Text, View, Button, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import backGround from '../assets/img/background.jpg';

const styles = EStyleSheet.create({
	backGround: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const LoginScreen = (props) => {
	return (
		<View style={{flex: 1}}>
			<ImageBackground
				source={backGround}
				style={styles.backGround}
			>
				<Text>LoginScreen Screen</Text>
				<Button
					title="Go to Register"
					onPress={() => props.navigation.navigate('Register')}
				/>
			</ImageBackground>
		</View>
	);
};

export default LoginScreen;
