import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const Loader = () => (
	<View style={styles.container}>
		<ActivityIndicator size="large" color={'blue'}/>
	</View>
);

export default Loader;
