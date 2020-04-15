import React from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	page: {
		flex: 1,
		paddingHorizontal: '20rem',
		paddingVertical: '30rem',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const ExampleScreen = () => {
	return (
		<View style={styles.page}>
			<Text>ExampleScreen</Text>
		</View>
	);
};

export default ExampleScreen;
